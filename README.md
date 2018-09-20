# drawForth

- by 김승범 picxenk@gmail.com
- http://metakits.cc

drawForth, simple environment to draw something with Forth

drawForth는 '하나 그리고 세 개의 코드'라는 워크숍을 위해 만들어진 간단한 코드 환경입니다.
'하나 그리고 세 개의 코드' 워크숍은 언메이크랩 http://unmakelab.org 의 '데이터 다다' 워크숍의 둘째날(2018/09/20)에 진행되었습니다.

Nick Morgan의 Easy Forth http://skilldrick.github.io/easyforth/ 를 기반으로 만들어졌고, 다음과 같은 수정이 이뤄졌습니다.
- Jekyll기반의 웹기반 튜토리얼 환경을 독립 코드 에디터로 분리했습니다.
- canvas를 직접 제어하는 어휘를 추가했습니다.
- 워크숍 환경에서 필요한 어휘를 추가했습니다.
- 한글 어휘를 추가했습니다.

-----
Forth는 오늘날 일반적인 코딩어를 다루는 사람에게는 매우 생소한 방식입니다. 기본적으로 단어와 숫자의 나열이며,
스택(stack)을 기반으로 각종 연산이 이뤄져서 저수준의 기계어와 유사합니다. 하지만 의미를 쉽게 쌓아올릴 수 있는 구조로
추상화를 높여가면 고수준의 표현이 가능해지고 어떤 면에서는 매우 인간적으로 보일 때도 있습니다.

# 기본적인 어휘

before stack | word | after stack
------------ | ---- | -----------
1 2 | + | 3
1 2 | dup | 1 2 2
1 2 | 2dup | 1 2 1 2
1 2 | swap | 2 1
1 2 | over | 1 2 1
1 2 | drop | 1
1 2 3 | rot | 2 3 1
2 3 1 | rot | 3 1 2
1 2 | min | 1
1 2 | max | 2
