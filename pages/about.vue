<template>
  <div>
    <v-layout align-center column justify-center>
      <h1><img src="~/assets/Logo.png" width="200px"></h1>
      <h4 class="subheading">
        <p>
          「Fukugyou」は複業メディアサイトです。<br>
          働き方改革で多様な働き方が選択できる今、複業は誰にでも可能性のある働き方です。<br>
          私自身エンジニアとして複業を始めてから本業やプライベート、あるいは自分の長い人生において<br>
          非常に良い経験ができていると思っています。<br>
          そんな複業を色んな方に知って頂き、みなさまの選択肢の1つとなれば幸いです。
        </p>
      </h4>
    </v-layout>

    <v-layout align-center column justify-center class="author">
      author
    </v-layout>

    <v-layout align-center column justify-center>
      <v-flex>
        <v-avatar size="100">
          <img
            src="https://pbs.twimg.com/profile_images/896335739452968961/VnN2H-bw_400x400.jpg"
            alt="hikaru takahashi"
          >
        </v-avatar>
      </v-flex>
      <v-flex>
        <h4 class="subheading">
          <p>
            ・ITエンジニア/マネージャー<br>
            ・株式会社エッグシステムCTO(複業社員)<br>
            ・会社員として働きながら複業社員としてwebサイト開発やセミナー講師などもする
          </p>
        </h4>
        <v-layout align-center row justify-space-around class="sns">
          <a href="https://github.com/hikarut"><v-icon class="square">fa-github-square</v-icon></a>
          <a href="https://twitter.com/light940"><v-icon class="square">fa-twitter-square</v-icon></a>
          <a href="https://www.facebook.com/hikaru.takahashi.5031"><v-icon class="square">fa-facebook-square</v-icon></a>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style scoped>
h1 img {
  padding-top: 30px;
}
h4 p {
  width: 90%;
  margin: 0 auto;
}
.sns {
  margin: 10px 0px 30px 0px;
}
.author {
  padding-top: 20px;
  font-size: 20px;
}
.square {
  font-size: 35px;
}
a {
  text-decoration: none;
}
</style>
