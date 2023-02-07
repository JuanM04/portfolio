---
title: In Space with Markiplier
createdAt: 2022-06-20
updatedAt: 2022-06-26
---

<!-- toc -->

## All videos

```mermaid
graph TD;
    intro["In Space with Markiplier: Part 1"]
      intro-->intro_L["Put Out the Fire"]
        intro_L-->wake_mark
      intro-->intro_R["Fix Life Support"]
        intro_R-->intro_RL["Wake the Crew"]
          intro_RL-->intro_RLL["Call for Backup"]
            intro_RLL-->wake_mark
          intro_RL-->intro_RLR["Wake the Crew"]
            intro_RLR-->intro_RLRT["Blow IT up before IT blows YOU up!"]
              intro_RLRT-->intro_RLRTL["I Believe You"]
                intro_RLRTL-->light
              intro_RLRT-->intro_RLRTR["This Must be a Dream!"]
                intro_RLRTR-->light
            intro_RLR-->intro_RLRB["Wake the Crew"]
              intro_RLRB-->light
        intro_R-->intro_RR["Wear a Disguise"]
          intro_RR-->wake_mark

    wake_mark[["Wake Mark act"]]:::arc
      wake_mark-->wake_mark_TL["Send Mark In"]
        wake_mark_TL-->wake_mark_TLL["Fix it from the Outside!"]
          wake_mark_TLL-->wake_mark_TLRT
          wake_mark_TLL-->wake_mark_TLRB
        wake_mark_TL-->wake_mark_TLR["Send Mark in Again"]
          wake_mark_TLR-->wake_mark_TLRT["Send Mark in... Again"]
            wake_mark_TLRT-->light
          wake_mark_TLR-->wake_mark_TLRB["Fix it from the Outside!"]
            wake_mark_TLRB-->light
      wake_mark-->wake_mark_BL["Wake the Crew"]
        wake_mark_BL-->wake_mark_TLL
        wake_mark_BL-->wake_mark_BLR["Wake the Crew"]
          wake_mark_BLR-->wake_mark_BLRT["Wake the Crew"]
            wake_mark_BLRT-->light
          wake_mark_BLR-->wake_mark_TLRB
      wake_mark-->wake_mark_BR["Fix it from the Outside!"]
        wake_mark_BR-->wake_mark_TLR
        wake_mark_BR-->wake_mark_TLL

    light["Go Towards the Light..."]
    light-->light_L["Call an Emergency Meeting"]
      light_L-->light_LL["Send a Distress Signal"]
        light_LL-->light_LLL["Attack"]
          light_LLL-->20s
        light_LL-->light_LLR["Don't Attack"]
          light_LLR-->light_LLRL["We Don't Need Your Help!"]
            light_LLRL-->bandit
          light_LLR-->light_LLRR["We Need Your Help"]
            light_LLRR-->bandit
      light_L-->light_LR["Pop 'er in Reverse!"]
        light_LR-->20s
    light-->light_R["Jump in Again!"]
      light_R-->light_L
      light_R-->light_RR["Jump in Again!"]
        light_RR-->light_L
        light_RR-->light_RRR["Jump in Again!"]
          light_RRR-->light_L
          light_RRR-->light_R

    20s[["20s arc"]]:::arc
      20s-->20s_L["Send a Distress Signal"]
        20s_L-->20s_LL["Give Mark \"The Signal\""]
          20s_LL-->narrator
        20s_L-->20s_LR["Throw Down Your Weapons"]
          20s_LR-->bandit
      20s-->20s_R["Fire All Weapons At The Wormhole"]
        20s_R-->narrator

    narrator[["Narrator arc"]]:::arc
      narrator-->narrator_T["Use the Device"]
        narrator_T-->bandit
      narrator-->narrator_B["Plan K"]
        narrator_B-->narrator_BL{{"Well Now I'm Not Doing It!"}}
        narrator_B-->narrator_BR["Step in the Wormhole"]
          narrator_BR-->part2

    bandit[["Bandit arc"]]:::arc
      bandit-->bandit_L["Open the Door"]
        bandit_L-->bandit_LL["Open the Door"]
          bandit_LL-->bandit_LLT["Open the Door"]
            bandit_LLT-->part2
          bandit_LL-->bandit_LLB["Don't Open the Door"]
            bandit_LLB-->bandit_RLLT
            bandit_LLB-->bandit_RLLB
        bandit_L-->bandit_LR["Don't Open the Door"]
          bandit_LR-->part2
      bandit-->bandit_R["Don't Open the Door"]
        bandit_R-->bandit_RL["Gunther! Think of the Colonists!"]
          bandit_RL-->bandit_RLL["Blow IT up before IT blows YOU up!"]
            bandit_RLL-->bandit_RLLT["We've Been Here Before"]
                bandit_RLLT-->part2
              bandit_RLL-->bandit_RLLB["We've Never Been Here"]
                bandit_RLLB-->part2
          bandit_RL-->bandit_RLR["Burt! Think Of The Colonists!"]
            bandit_RLR-->bandit_RLRL["Fix it from the Outside!"]
              bandit_RLRL-->bandit_RLRLT["I'm Ready"]
                bandit_RLRLT-->part2
              bandit_RLRL-->bandit_RLRLB["Hold on a second..."]
                bandit_RLRLB-->part2
            bandit_RLR-->bandit_RLRR{{"Celci! Think Of The Colonists!"}}
        bandit_R-->bandit_RR["Call For Backup"]
          bandit_RR-->part2

    part2["In Space with Markiplier: Part 2"]
      part2-->part2_L["Romance"]
        part2_L-->part2_RL
        part2_L-->part2_RR
      part2-->part2_R["Horror"]
        part2_R-->part2_RL["Left"]
          part2_RL-->part2_RLL["Great Job Mack!"]
            part2_RLL-->part2_RLLL["Left"]
              part2_RLLL-->mark_crying
            part2_RLL-->part2_RLLR["Right"]
              part2_RLLR-->part2_RLLRL["Open the Door"]
                part2_RLLRL-->mark_crying
              part2_RLLR-->part2_RLLRR["Don't Open the Door"]
                part2_RLLRR-->mark_crying
          part2_RL-->part2_RLR["You're Not Mark!"]
            part2_RLR-->mark_crying
        part2_R-->part2_RR["Right"]
          part2_RR-->part2_RRL["You Look a Lot Like Markiplier..."]
            part2_RRL-->part2_RLLL
            part2_RRL-->part2_RLLR
          part2_RR-->part2_RRR["Maybe Markiplier is in This Very Room..."]
            part2_RRR-->part2_RLLL
            part2_RRR-->part2_RLLR

    mark_crying[["Mark crying"]]:::arc
      mark_crying-->mark_crying_T["It's ok, Mark! You can cry!"]
        mark_crying_T-->mark_crying_TTR["Mark, you can't go back!"]
          mark_crying_TTR-->lady
        mark_crying_T-->mark_crying_TBR["Cut the Red Wire"]
          mark_crying_TBR-->mark_crying_TBRTR["Cut the Yellow Wire"]
            mark_crying_TBRTR-->lady
          mark_crying_TBR-->mark_crying_TBRBR["Mark, Don't Use the Warp Core!"]
            mark_crying_TBRBR-->lady
          mark_crying_TBR-->mark_crying_TBRBL["I Love Scary Stories!"]
            mark_crying_TBRBL-->mark_crying_TBRBLL["Run"]
              mark_crying_TBRBLL-->lady
            mark_crying_TBRBL-->mark_crying_TBRBLR["Hide"]
              mark_crying_TBRBLR-->mark_crying_TBRBLRT["The Captain Finds Mark"]
                mark_crying_TBRBLRT-->lady
              mark_crying_TBRBLR-->mark_crying_TBRBLRB["The Narrator Suffers a Terrible Fate"]
                mark_crying_TBRBLRB-->lady
        mark_crying_T-->mark_crying_TBL["Cut the Blue Wire"]
          mark_crying_TBL-->mark_crying_TBRTR
          mark_crying_TBL-->mark_crying_TBRBR
          mark_crying_TBL-->mark_crying_TBRBL
      mark_crying-->mark_crying_B["Aww, You gonna cry?"]
        mark_crying_B-->mark_crying_TBRBLL
        mark_crying_B-->mark_crying_TBRBLR

    lady[["Running from the Lady arc"]]:::arc
      lady-->lady_L["Sneak Away"]
        lady_L-->lady_RL
        lady_L-->lady_RR
      lady-->lady_R["Intervene"]
        lady_R-->lady_RL["Left"]
          lady_RL-->lady_RLL["Left"]
            lady_RLL-->lady_RLLL["Left"]
              lady_RLLL-->ending
            lady_RLL-->lady_RR
          lady_RL-->lady_RLR["Right"]
            lady_RLR-->lady_RLRL["Left"]
              lady_RLRL-->lady_RLLL
              lady_RLRL-->lady_RLRR
            lady_RLR-->lady_RLRR["Right"]
              lady_RLRR-->ending
        lady_R-->lady_RR["Right"]
          lady_RR-->lady_RL
          lady_RR-->lady_RLR

    ending[["Ending"]]:::arc
      ending-->ending_L{{"Let Go"}}
      ending-->ending_R{{"Hold On"}}

    classDef arc color:white,fill:#ef4444,stroke:black;

    click 20s_L "https://youtu.be/QgImksN6b3M"
    click 20s_LL "https://youtu.be/aM-uQMUO6i4"
    click 20s_LR "https://youtu.be/3De90tdLJmk"
    click 20s_R "https://youtu.be/wfdMicitgnA"
    click bandit_L "https://youtu.be/NW-UYcqwDpU"
    click bandit_LL "https://youtu.be/3TboquFEMFA"
    click bandit_LLB "https://youtu.be/4zQJNqRjadQ"
    click bandit_LLT "https://youtu.be/qeu7M8wIpyc"
    click bandit_LR "https://youtu.be/jGGT5FHDhFI"
    click bandit_R "https://youtu.be/iMz8rZD_9hg"
    click bandit_RL "https://youtu.be/szDl_uKbOJg"
    click bandit_RLL "https://youtu.be/VpyFw2-Cec4"
    click bandit_RLLB "https://youtu.be/PteUZUCJ7iY"
    click bandit_RLLT "https://youtu.be/fGewtUPe7TI"
    click bandit_RLR "https://youtu.be/DsZDtqK4f1A"
    click bandit_RLRL "https://youtu.be/MJM6QneZbVA"
    click bandit_RLRLB "https://youtu.be/g_ILOR7_mHw"
    click bandit_RLRLT "https://youtu.be/6cARNW6O4sY"
    click bandit_RLRR "https://youtu.be/-Yn4Z-mPKMM"
    click bandit_RR "https://youtu.be/cjGsjagqkk4"
    click ending_L "https://youtu.be/YdGoj6tnYNs"
    click ending_R "https://youtu.be/qx6PkwY-_Jc"
    click intro "https://youtu.be/j64oZLF443g"
    click intro_L "https://youtu.be/raIqPgW-quI"
    click intro_R "https://youtu.be/mGtFUm-sgh4"
    click intro_RL "https://youtu.be/HHlphhgN1kU"
    click intro_RLL "https://youtu.be/8Figj37SoPg"
    click intro_RLR "https://youtu.be/ogrmyhb5gNI"
    click intro_RLRB "https://youtu.be/SKODGzV20LU"
    click intro_RLRT "https://youtu.be/98bVPHiSY_k"
    click intro_RLRTL "https://youtu.be/uQO4CLQhKuY"
    click intro_RLRTR "https://youtu.be/5nZZAmvRIuU"
    click intro_RR "https://youtu.be/5eG8rFt_JuY"
    click lady_L "https://youtu.be/YMbCQd_LdBs"
    click lady_R "https://youtu.be/1dumcgS6cQo"
    click lady_RL "https://youtu.be/ULSkPjBNCd8"
    click lady_RLL "https://youtu.be/nIiScoVQ9Rc"
    click lady_RLLL "https://youtu.be/WWqo6KfU_p0"
    click lady_RLR "https://youtu.be/iiOu6cv6Cy4"
    click lady_RLRL "https://youtu.be/nyFV41oK67o"
    click lady_RLRR "https://youtu.be/dBnFGiGN-3M"
    click lady_RR "https://youtu.be/w9u3uLLEF6U"
    click light "https://youtu.be/HcfjRwNr89Q"
    click light_L "https://youtu.be/uoyvZ5mXiio"
    click light_LL "https://youtu.be/diaW8rX9CZg"
    click light_LLL "https://youtu.be/YBDAQclN9jQ"
    click light_LLR "https://youtu.be/g72tvDIu_Ys"
    click light_LLRL "https://youtu.be/3cE9v0tdEGY"
    click light_LLRR "https://youtu.be/uj8TRJDz98E"
    click light_LR "https://youtu.be/CXUKjHzoMl4"
    click light_R "https://youtu.be/wKNzPHIk0EY"
    click light_RR "https://youtu.be/bjxEL2A9F4Q"
    click light_RRR "https://youtu.be/Qbr2cyEgWS4"
    click mark_crying_B "https://youtu.be/wE96fQwjPT4"
    click mark_crying_T "https://youtu.be/z3tvzYvfkkQ"
    click mark_crying_TBL "https://youtu.be/ctjK7eET3bo"
    click mark_crying_TBR "https://youtu.be/Pwo3-jlT8e0"
    click mark_crying_TBRBL "https://youtu.be/ZL1zgAi_vcM"
    click mark_crying_TBRBLL "https://youtu.be/AkEXMKoUHEU"
    click mark_crying_TBRBLR "https://youtu.be/Lf7aoSTCtwE"
    click mark_crying_TBRBLRB "https://youtu.be/e-sOd94VQYg"
    click mark_crying_TBRBLRT "https://youtu.be/NlK43-FvAG4"
    click mark_crying_TBRBR "https://youtu.be/Yfu54aRdYrY"
    click mark_crying_TBRTR "https://youtu.be/v-wQLpNJmr0"
    click mark_crying_TTR "https://youtu.be/kDIVnEgcOxU"
    click narrator_B "https://youtu.be/FuQt2BhgCQo"
    click narrator_BL "https://youtu.be/eoOePnBbGWY"
    click narrator_BR "https://youtu.be/7iJoWgYwL7g"
    click narrator_T "https://youtu.be/17r42pf7kwY"
    click part2 "https://youtu.be/xAOv_zvXBQk"
    click part2_L "https://youtu.be/kcHe2hLE0PE"
    click part2_R "https://youtu.be/dXBkC_-72vA"
    click part2_RL "https://youtu.be/slYiLYLvdV0"
    click part2_RLL "https://youtu.be/GDOfnMYMens"
    click part2_RLLL "https://youtu.be/V2ucVWqe8p8"
    click part2_RLLR "https://youtu.be/S_znm-UIGAI"
    click part2_RLLRL "https://youtu.be/YyObr8Mg2RU"
    click part2_RLLRR "https://youtu.be/3J2f_HIEoxU"
    click part2_RLR "https://youtu.be/E-ElzbdMBYA"
    click part2_RR "https://youtu.be/sart_g4SXgM"
    click part2_RRL "https://youtu.be/A8wiPLzzJ00"
    click part2_RRR "https://youtu.be/WW5oaCBpZXo"
    click wake_mark_BL "https://youtu.be/Dq1BrxAXQLg"
    click wake_mark_BLR "https://youtu.be/Tn1MkhNUaA4"
    click wake_mark_BLRT "https://youtu.be/ch07UcMzWkQ"
    click wake_mark_BR "https://youtu.be/Rm7nK2x_FWQ"
    click wake_mark_TL "https://youtu.be/NK-u4ukbOFw"
    click wake_mark_TLL "https://youtu.be/uIMvjur42Vw"
    click wake_mark_TLR "https://youtu.be/bYy_aAiTfYA"
    click wake_mark_TLRB "https://youtu.be/Y0Ja_BrgGhA"
    click wake_mark_TLRT "https://youtu.be/7P9mpmsLSno"
```

## Extras

- [BLOOPERS + BTS](https://www.youtube.com/watch?v=vqCRV9ppDgU)
- [Trailer](https://www.youtube.com/watch?v=QD7QU0UvCUM)
- Teasers
  - [Ë̸̼R̴̢̼̂R̵̡̙̚͜Ǫ̸͙͚̈R̶̦̮̝͗](https://www.youtube.com/watch?v=S_WrzagTJ3o)
  - [P̴̮̌̓A̵̧͌͜R̶̰̀A̶D̶O̵X̴͓̟̖̭̠̜̣̪̹́͗͗͊̆̀͝ ̵͙̈̚D̴̖̍E̷T̷E̵̩͑͜ͅC̵̻͊T̸̺͎̾̾È̷͕Ḓ̴̵̛̥̫̰̊͗̔̃̌̅̀̓̂̕͝ͅ](https://www.youtube.com/watch?v=gELvzeXyJAI)
  - [The Multiverse Is Littered With the Corpses of Your Failures](https://www.youtube.com/watch?v=_53FY653nHI)
  - [YOU DO NOT RECOGNIZE THE BODIES IN THE WORMHOLE](https://www.youtube.com/shorts/RKMtT6QDq94)
- 🎵 _Space Was Cool_
  - [Single](https://www.youtube.com/watch?v=1H_4YnslxZ4)
  - [Orchestral version](https://www.youtube.com/watch?v=d9gwMObLTAw)
  - [Video clip (from Part 2)](https://www.youtube.com/watch?v=dBnFGiGN-3M)
- [🎵 _The Last Goodbye_](https://www.youtube.com/watch?v=c1SVmXMYiyc)
