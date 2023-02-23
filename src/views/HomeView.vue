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
            <Link href="https://book.douban.com/subject/36132750/" :new-window="true">算法竞赛</Link>
            》题单：
          </span>
          <Link href="https://vjudge.net/article/3284" :new-window="true">
            Vjudge Workbook
          </Link>
        </li>
        <li>
          <span>
            《
            <Link href="https://book.douban.com/subject/24749842/" :new-window="true">挑战程序设计竞赛</Link>
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
            <Link href="https://book.douban.com/subject/30136932/" :new-window="true">算法竞赛进阶指南</Link>
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
