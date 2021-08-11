'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p'); 

    const quizSet = shuffle([
        {q: 'Q:ソーニャちゃんのお仕事知ってる?ｼﾞｮｰｼｷﾀﾞﾖ', c:['暗殺者','たぶん普通の女子高生','おバカ','忍者']},
        {q: 'Q:わたしの髪の色は何色でしょ～?ｽｷﾝｹｱ!', c:['茶色','金髪','青色','赤色']},
        {q: 'Q:わたしの名字は?あぁ私はどこ?ここはだれ?', c:['折部','赤﨑','田村','呉織']},
        {q: 'Q:「531×58-310÷915」の答え分かる?おバカにはむずかしいかな～?', c:['30797.6612','30122.625','40001.321','33333.333']},
        {q: 'Q:わたしがヨーヨーできる唯一にして最大の技は?ﾁｮｳｿｸｽﾋﾟﾅｰ!', c:['犬の散歩','ループザループ','エレベーター','タワー']},
        {q: 'Q:〔キルミーベイベーファンブック〕より、わたしの愛犬の名前(原作4巻:白い首輪)は?ﾜﾝﾜﾝﾜﾝ!?', c:['ちくわぶ','ちくわ','こんぶ','するめ']},
        {q: 'Q:〔キルミーベイベーファンブック〕より、わたしの愛犬の名前(原作3巻:黒い首輪)は?ﾜﾝﾜﾝﾜﾝ!?', c:['ちくわ','ちくわぶ','するめ','こんぶ']},
        {q: 'Q:〔キルミーベイベーファンブック〕より、わたしの好きなものなーーんだ?', c:['お小遣い','近所で拾った変わった形の石','ソーニャちゃん','おとうふ']},
        {q: 'Q:原作12巻、笑いが止まらない体になったソーニャちゃんが「スンッ」となったわたしのモノマネはなーんだ?', c:['ショベルカー','ノコギリザメ','イエティー','トリケラトプス']},
        {q: 'Q:原作11巻、わたしの傘が壊れてしまった理由は?ｽﾅｵｼﾞｬﾅｲﾅｧ-', c:['格闘術の練習','雨ごいの生贄','交通事故','犬が食べた']},
        {q: 'Q:原作10巻、わたしを攫ったUFOは何に擬態してたでしょー?ｷｭｲﾝｷｭｲﾝｷｭｲﾝ!', c:['飛行機','気球','凧','パラシュート']},
        {q: 'Q:原作9巻、わたしが通販で買ったヤバい植物のタネは?ﾋｨｨｨ!', c:['マンドラゴラ','ヘビイチゴ','目に毒があるジャガイモ','麦芽']},
        {q: 'Q:原作8巻、わたしがマスターしようとした形意拳のモチーフは?ｱﾁｮｰ!', c:['ショベルカー','フジツボ','サザエ','馬と鹿']},
        {q: 'Q:原作7巻、わたしが知り合いから集まったオウムの名前は?ｿｰﾆｬﾁｬﾝﾊｱﾀﾏｶﾞｶﾜｲｿｰﾅﾉ!', c:['鳥政(とりまさ)','鳥人(とりじん)','メカオウム様','ぴよっぴー']},
        {q: 'Q:原作6巻、わたしが好きなご当地マスコットキャラの名前は?ｳｯｪｰｲ!', c:['のっぽっぽくん','ほしにゃん','とーふーふー','ジャスティスさん']},
        {q: 'Q:原作5巻、体力測定でわたしが挑んだファンタスティックな種目は?ﾔｯﾍﾞｰ', c:['上体反らし走り幅跳び','野球サッカー','反復横跳び持久走','スタイリッシュ飛び箱']},
        {q: 'Q:原作4巻、あとがきでソーニャちゃんがわたしにかけた関節技は何!?ｲﾀﾀﾀﾀ!', c:['アンクルホールド','卍固め','スコーピオン','フェイスロック']},
        {q: 'Q:原作3巻、わたしが新年会の罰ゲームでやった一発ギャグは?ﾏｹﾀ…!', c:['ドリルタンク','現金トアトリート','イカ','ゴミ収集車']},
        {q: 'Q:原作2巻、わたしが作った自分のパペットのモチーフは?ふぅ～かぁわいい!', c:['ねこ','アリゲーター','ワニ','カラス']},
        {q: 'Q:原作1巻、わたしがソーニャちゃんに果敢にも挑んだ日本の国技なーんだ?ｵｯｵｯ…', c:['相撲','国技','カポエラ','弓道']},
    ]).splice(0,8);

    let currentNum = 0;                                          
    let isAnswered;　　　　　　　　　　　　　　　　　　　　　　　　　
    let score = 0;

// シャッフル関数
    function shuffle(arr){
        for (let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1)); 
            [arr[j],arr[i]] = [arr[i],arr[j]];     
        }
        return arr;    
    }

// 要素li。開始時はfalse、isAnswerがfalseでない(=trueなら)、処理終わり。
    function checkAnswer(li){
        if (isAnswered === true){
            return;
        }
        isAnswered = true;

// 正誤判定、何番目を押すとどのクラスを付与するか。 c[0]⇨correct  c[1.2.3]⇨First Second Third
        if (li.textContent === quizSet[currentNum].c[0]){
            li.classList.add('correct');
            score++;
        }else if(li.textContent === quizSet[currentNum].c[1]){
            li.classList.add('wrongFirst');
        }else if(li.textContent === quizSet[currentNum].c[2]){
            li.classList.add('wrongSecond');
        }else{
            li.classList.add('wrongThird');                       
        }
        btn.classList.remove('disabled');
    }

// 問題せってぃんぐ。「while」
    function setQuiz(){
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;   
    
    while(choices.firstChild){
        choices.removeChild(choices.firstChild);
    }
// quizSet.c　shuffle配置。li要素　CreEle　作成。li.texCon　代入。li click=> checkAnswer関数起動。
    const shuffledChoices = shuffle([...quizSet[currentNum].c]); 
    shuffledChoices.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click',() => {
            checkAnswer(li);
        });
        choices.appendChild(li);

// 最後の問題(quizSet.length-1) === => btn texCon
    });
    if(currentNum === quizSet.length - 1 ){
        btn.textContent = 'よく頑張りました！じゃじゃーん！君の点数だよ！'                  
    }

    }

// btn cli => if btn.disabled.contain => return
    setQuiz();

    btn.addEventListener('click',() => {
        if(btn.classList.contains('disabled')){
            return;
        }
        btn.classList.add('disabled');
        
//  最後の問題(quizSet.length-1) === => ScoreLabel texCON /// remove hidden 
        if(currentNum === quizSet.length - 1){
            scoreLabel.textContent = `はい！あなたの点数は… ${score} / ${quizSet.length} だよ！`;   
            result.classList.remove('hidden');

        } else {
          currentNum++;
          setQuiz();    
        }
        

    });

}