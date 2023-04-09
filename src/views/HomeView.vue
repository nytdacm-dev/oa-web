<script setup lang="ts">
import MDArticle from '@/components/MDArticle.vue'

const article = `## 做点题吧

- 新手入门题单： [牛客](https://ac.nowcoder.com/discuss/817596)
- 《[算法竞赛](https://union-click.jd.com/jdc?e=618|pc|&p=JF8BANgJK1olXwUFU1xcAUoRA18IGV4QXwACUG4ZVxNJXF9RXh5UHw0cSgYYXBcIWDoXSQVJQwYAUVtfDksTHDZNRwYlJm8EDh8GdjV1aDtwXh4QNlJ0PSUPXkcbM244G1oUXgMAUlpUD3snA2g4STXN67Da8e9B3OGY1uefK1olXQEEUlpcAUseAWgJHWsSXQ8yDwszfiBUQBRNTyRLO1tiZG5tC3sQA2YcHSlUDxIEJm5tCHsUM28AGFsUVQIEVEJdCUkTCnMIHF0TWQcLVFhVCk8eM20JGl8cbTY)》题单： [Vjudge Workbook](https://vjudge.net/article/3284)
- 《[挑战程序设计竞赛](https://union-click.jd.com/jdc?e=618|pc|&p=JF8BANgJK1olXwUFU1xcAUoRA18IG1gSWgEHXW4ZVxNJXF9RXh5UHw0cSgYYXBcIWDoXSQVJQwYCV1laD04eHDZNRwYlLVVXJyBfbBN1QGgWWzJ8OFVqKVsleEcbM244G1oUXgMAUlpUD3snA2g4STXN67Da8e9B3OGY1uefK1olXQEEUlpcAUgXBW0KG2sSXQ8yDwszfiBUQBRNTyRLO1tiZG5tC3sQA2YcHSlUDxIEJm5tCHsUM28AGVoXXgUCV0JdCU4UAXMIHF0TWQcLV19VCk0XM20JGl8cbTY)》题单： [Vjudge Workbook](https://vjudge.net/article/46)
- kuangbin带你飞系列题单：[ Vjudge Workbook](https://vjudge.net/article/187)
- 《[算法竞赛进阶指南](https://union-click.jd.com/jdc?e=618|pc|&p=JF8BAN0JK1olXgcCU1lVCk8SC18IGloSWwUAXFhaCEsSBF9MRANLAjZbERscSkAJHTdNTwcKBlMdBgABFksWAmgOGFkdWwECVFtaFxJSXzI4RTBhFQFmNF49aylkQDINGVt1GnFaJFJROEonA24JGF4XWwILU25tCEwnQgEIH1gWXwcyVW5dD00RB24BG1sTXAQDZFldAXtMVgF-cBhWJkNWKwA7VSsnM18LK1wVVBIEJh8PHE1lM18IK1glXQ4AVVxdCUkeH28JGlsTQQYFUlhZCUIXA24JH1MlXwcDUFdtOA)》题单： [牛客（推荐，可以计算提交记录）](https://ac.nowcoder.com/acm/archive/oi-advance) [Acwing](https://www.acwing.com/activity/content/6/)
- 蓝桥杯题单： [Vjudge Workbook](https://vjudge.net/article/3458)

## 学会习吧

- [OI Wiki 上的 C++ 语法入门教程](https://oi-wiki.org/lang/helloworld/)
- [牛客竞赛算法入门班](https://www.nowcoder.com/courses/cover/live/724?coupon=A6t6JmF)
- [Acwing 认证学生身份领 AC 币](https://www.acwing.com/user/security/school_verify/ac_stars/) 邀请码：WYHHY

## 神一样的网站

- [OI Wiki](https://oi-wiki.org/)
`
</script>

<template>
  <div class="main">
    <MDArticle :data="article" />
  </div>
</template>
