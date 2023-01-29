<template>
  <div class="footer">
    <div class="copyright">
      <div>Copyright &copy; 2023 nytdacm</div>
      <div>Developed by
        <a href="https://github.com/gtn1024" target="_blank" style="text-decoration: none;">gtn1024</a>
      </div>
      <div>Coach:
        <span>LiangYali</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  height: var(--header-height);
  justify-content: center;
  color: #808080;

  >.copyright {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;

    >div {
      margin-top: 2px;
    }

    a {
      color: #888;

      &:hover {
        color: #333;
      }
    }
  }
}
</style>
