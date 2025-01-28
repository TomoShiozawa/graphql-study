---
theme: gaia
class: invert
marp: true
paginate: true

---

<!--
_class: invert lead
-->
# GraphQL勉強会 #3

### ~バックエンドの実装してみる編~

---

<!--
_backgroundColor: black
_color: white
_class: lead
_paginate: false
-->

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Zen+Antique&display=swap');

section {
  font-family: "Zen Antique";
  font-size: 300px;
}

.title {
  font-size: 180px;
}

.comma {
  letter-spacing: -120px;
}

.shitemitai {
  letter-spacing: -40px;
}

.number {
  position: absolute;
  right: 130px;
  bottom: 50px;
  font-size: 100px;
  line-height: 100%;
}
</style>

<div class="title">
実装<span class="comma">、</span>してみたい
</div>
<div class="number">
第<br>
参<br>
話
</div>

---

# 今回はバックエンド実装してみる編

- スキーマ設計ができたら実装しよう
- バックエンドから実装をしていきます
- サンプルはリポジトリにあげてますので、細かい部分はそちらも参考にしてください
