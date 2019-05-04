<template>
  <div>
    <v-layout align-center column justify-center>
      <!-- <h1><img src="~/assets/Logo.png" width="200px"></h1> -->
      <h4 class="subheading">
        <p>
          「Fukugyou」はエンジニア向け複業メディアサイトです。<br>
          多様な働き方が選択できる今、複業は誰にでも可能性のある働き方です。<br>
          私自身エンジニアとして複業を始めてから本業やプライベート、あるいは自分の長い人生において<br>
          非常に良い経験ができていると思っています。<br>
          そんな複業の楽しさを1人でも多くの方に知って頂ければ幸いです。<br>
          特にエンジニアの方がもっと楽しく自由に開発ができるように、必要な情報をどんどん発信していきたいと思います。<br>
          そして楽しく働ける幸せな社会を創っていきたいです。
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
          <a href="https://github.com/hikarut" target="blank"><v-icon class="square" color="#24292e">fab fa-github-square</v-icon></a>
          <a href="https://twitter.com/light940" target="blank"><v-icon class="square" color="#55acee">fab fa-twitter-square</v-icon></a>
          <a href="https://www.facebook.com/hikaru.takahashi.5031" target="blank"><v-icon class="square" color="#315096">fab fa-facebook-square</v-icon></a>
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
/* h1 img { */
h4 {
  padding-top: 30px;
}
h4 p {
  width: 90%;
  margin: 0 auto;
}
.author {
  padding-top: 50px;
  padding-bottom: 10px;
  font-size: 20px;
}
.sns {
  margin: 5px 0px 30px 0px;
}
.square {
  font-size: 35px;
}
a {
  text-decoration: none;
}
</style>
