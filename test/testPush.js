const testPush = () => {

    push([[1, 'てすとてすとこれはテストです']]);
    push([[2, 'https://tk.ismcdn.jp/mwimgs/e/b/1140/img_eb31afc9c1fb914d68a7c73b657c7ebe183087.jpg', 'https://tk.ismcdn.jp/mwimgs/e/b/1140/img_eb31afc9c1fb914d68a7c73b657c7ebe183087.jpg']]);
    push([[1, '週間報告'], [2, 'https://tk.ismcdn.jp/mwimgs/e/b/1140/img_eb31afc9c1fb914d68a7c73b657c7ebe183087.jpg', 'https://tk.ismcdn.jp/mwimgs/e/b/1140/img_eb31afc9c1fb914d68a7c73b657c7ebe183087.jpg']]);
}

const testPostData = () => {

    console.log(postData([[1, 'text']]));
    console.log(postData([[2, 'example.com', 'example.com']]));
    console.log(postData([[1, '今週の睡眠'], ['2', 'example.com', 'example.com']]));

}