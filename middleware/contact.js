export default ({ store, redirect }) => {
  // 情報が入力されていない場合
  if (
    !store.state.contact.name ||
    !store.state.contact.mail ||
    !store.state.contact.contents
  ) {
    // 問い合わせトップにリダイレクトさせる
    return redirect('/contact')
  }
}
