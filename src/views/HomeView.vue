<script setup lang="ts">
import { NH2 } from 'naive-ui'
import Link from '@/components/Link.vue'
</script>

<template>
  <div class="main">
    <div>
      <NH2>做点题吧</NH2>
      <ul>
        <li>
          新手入门题单：
          <Link href="https://ac.nowcoder.com/discuss/817596" :new-window="true">
            牛客
          </Link>
        </li>
        <li>
          <span>
            《
            <Link href="https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BANgJK1olXwUFU1xcAUoRA18IGV4QXwACUG4ZVxNJXF9RXh5UHw0cSgYYXBcIWDoXSQVJQwYAUVtfDksTHDZNRwYlJm8EDh8GdjV1aDtwXh4QNlJ0PSUPXkcbM244G1oUXgMAUlpUD3snA2g4STXN67Da8e9B3OGY1uefK1olXQEEUlpcAUseAWgJHWsSXQ8yDwszfiBUQBRNTyRLO1tiZG5tC3sQA2YcHSlUDxIEJm5tCHsUM28AGFsUVQIEVEJdCUkTCnMIHF0TWQcLVFhVCk8eM20JGl8cbTY" :new-window="true">算法竞赛</Link>
            》题单：
          </span>
          <Link href="https://vjudge.net/article/3284" :new-window="true">
            Vjudge Workbook
          </Link>
        </li>
        <li>
          <span>
            《
            <Link href="https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BANgJK1olXwUFU1xcAUoRA18IG1gSWgEHXW4ZVxNJXF9RXh5UHw0cSgYYXBcIWDoXSQVJQwYCV1laD04eHDZNRwYlLVVXJyBfbBN1QGgWWzJ8OFVqKVsleEcbM244G1oUXgMAUlpUD3snA2g4STXN67Da8e9B3OGY1uefK1olXQEEUlpcAUgXBW0KG2sSXQ8yDwszfiBUQBRNTyRLO1tiZG5tC3sQA2YcHSlUDxIEJm5tCHsUM28AGVoXXgUCV0JdCU4UAXMIHF0TWQcLV19VCk0XM20JGl8cbTY" :new-window="true">挑战程序设计竞赛</Link>
            》题单：
          </span>
          <Link href="https://vjudge.net/article/46" :new-window="true">
            Vjudge Workbook
          </Link>
        </li>
        <li>
          <span>kuangbin带你飞系列题单：</span>
          <Link href="https://vjudge.net/article/187" :new-window="true">
            Vjudge Workbook
          </Link>
        </li>
        <li>
          <span>
            《
            <Link href="https://union-click.jd.com/jdc?e=618%7Cpc%7C&p=JF8BAN0JK1olXgcCU1lVCk8SC18IGloSWwUAXFhaCEsSBF9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWAmgOGFkdWwECVFtaFxJSXzI4RTBhFQFmNF49aylkQDINGVt1GnFaJFJROEonA24JGF4XWwILU25tCEwnQgEIH1gWXwcyVW5dD00RB24BG1sTXAQDZFldAXtMVgF-cBhWJkNWKwA7VSsnM18LK1wVVBIEJh8PHE1lM18IK1glXQ4AVVxdCUkeH28JGlsTQQYFUlhZCUIXA24JH1MlXwcDUFdtOA" :new-window="true">算法竞赛进阶指南</Link>
            》题单：
          </span>
          <Link href="https://ac.nowcoder.com/acm/archive/oi-advance" :new-window="true">
            牛客（推荐，可以计算提交记录）
          </Link>
          <Link href="https://www.acwing.com/activity/content/6/" :new-window="true">
            Acwing
          </Link>
        </li>
        <li>
          蓝桥杯题单：
          <Link href="https://vjudge.net/article/3458" :new-window="true">
            Vjudge Workbook
          </Link>
        </li>
      </ul>
    </div>
  </div>
</template>
