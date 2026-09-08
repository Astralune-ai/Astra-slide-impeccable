#!/usr/bin/env python3
"""Renumber a multi-file SVG deck after inserting / moving / deleting slides.

Why this exists: every insert (S00b-, S03b-) or reorder silently desyncs two things
that are baked into *every* slide file —

  1. the corner-ring badge   (<g id="cornerRing"> … >NN</text>)
  2. the footer page counter (>NN / TOTAL · LABEL</text>)

Miss it and the deck shows "07 / 11" on page 9 of 13. Nothing errors; you find out
on stage. So: change the order in index.html, then run this.

Order is read from index.html's `const slides = [...]` — the same source the PDF
exporter trusts, so the deck, the PDF and the badges can never disagree.

Usage:
    python3 renumber_deck.py <deck-dir-or-index.html> [--dry-run]
"""
import argparse, os, re, sys


def read_order(index_path):
    src = open(index_path, encoding='utf-8').read()
    m = re.search(r'\bconst\s+slides\s*=\s*\[(.*?)\]\s*;', src, re.S)
    if not m:
        sys.exit(f'✗ 解析不出播放顺序：{index_path} 里没有 const slides = [...]')
    names = re.findall(r'\[\s*[\'"]([^\'"]+\.html?)[\'"]', m.group(1))
    if not names:
        sys.exit('✗ slides 数组为空')
    return names


def renumber(deck_dir, dry_run=False):
    index_path = os.path.join(deck_dir, 'index.html')
    if not os.path.isfile(index_path):
        sys.exit(f'✗ 找不到 {index_path}')
    names = read_order(index_path)
    total = len(names)
    changed = 0

    for i, name in enumerate(names, start=1):
        path = os.path.join(deck_dir, name)
        if not os.path.isfile(path):
            print(f'  ! 缺文件，跳过: {name}')
            continue
        src = open(path, encoding='utf-8').read()
        nn = f'{i:02d}'

        # 1) corner ring badge — the number inside <g id="cornerRing">
        out = re.sub(
            r'(<g id="cornerRing".*?font-size="9" fill="#c4a35a" opacity="0\.6">)\d+(</text>)',
            r'\g<1>' + nn + r'\g<2>', src, flags=re.S)

        # 2) footer counter  "NN / TOTAL · LABEL"  (label kept as-is)
        out = re.sub(r'>\s*\d+\s*/\s*\d+(\s*·\s*[^<]*)</text>',
                     '>' + nn + f' / {total}' + r'\g<1></text>', out)

        if out != src:
            changed += 1
            if not dry_run:
                open(path, 'w', encoding='utf-8').write(out)
        badge = re.search(r'>(\d+\s*/\s*\d+[^<]*)</text>', out)
        mark = '·' if out == src else '✎'
        print(f'  {mark} {nn}/{total}  {name:26s} {badge.group(1).strip() if badge else "(无页脚)"}')

    verb = '将改' if dry_run else '已改'
    print(f'\n{verb} {changed} 个文件 · 共 {total} 页')
    if dry_run:
        print('（--dry-run，没写盘）')
    return 0


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description='按 index.html 的播放顺序重编 deck 页码')
    ap.add_argument('target', help='deck 目录，或它的 index.html')
    ap.add_argument('--dry-run', action='store_true', help='只看会改什么，不写盘')
    a = ap.parse_args()
    d = a.target
    if os.path.basename(d).lower() in ('index.html', 'index.htm'):
        d = os.path.dirname(os.path.abspath(d))
    sys.exit(renumber(d, a.dry_run))
