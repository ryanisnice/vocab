const VOCAB_DATABASE = [
  // === WORKPLACE ENGLISH (30 Words) ===
  {
    word: "collaborate",
    pos: "v.",
    phonetic: "/kəˈlæbəreɪt/",
    translation: "合作，協作",
    definition: "To work jointly on an activity or project, especially to produce or create something.",
    category: "workplace",
    examples: [
      {
        en: "Our design team needs to collaborate with the engineering department to build the prototype.",
        zh: "我們的設計團隊需要與工程部門合作來建立原型。"
      },
      {
        en: "We can collaborate on this project via shared digital workspaces.",
        zh: "我們可以透過共享的數位工作空間在這個專案上進行協作。"
      }
    ]
  },
  {
    word: "prioritize",
    pos: "v.",
    phonetic: "/praɪˈɔːrətaɪz/",
    translation: "優先考慮，確定優先順序",
    definition: "To treat something as more important than other things.",
    category: "workplace",
    examples: [
      {
        en: "With so many deadlines approaching, you must learn to prioritize your tasks.",
        zh: "在這麼多截止日期逼近的情況下，你必須學會排定任務的優先順序。"
      },
      {
        en: "The management decided to prioritize customer satisfaction over short-term profits.",
        zh: "管理層決定將客戶滿意度置於短期利潤之上。"
      }
    ]
  },
  {
    word: "facilitate",
    pos: "v.",
    phonetic: "/fəˈsɪlɪteɪt/",
    translation: "促進，使便利，推動",
    definition: "To make an action or process easy or easier.",
    category: "workplace",
    examples: [
      {
        en: "Modern communication tools facilitate remote work across different time zones.",
        zh: "現代通訊工具促進了跨不同時區的遠端工作。"
      },
      {
        en: "The workshop is designed to facilitate open discussion among team members.",
        zh: "該工作坊旨在促進團隊成員之間的公開討論。"
      }
    ]
  },
  {
    word: "leverage",
    pos: "v.",
    phonetic: "/ˈlevərɪdʒ/",
    translation: "利用，發揮（優勢）",
    definition: "To use something to maximum advantage.",
    category: "workplace",
    examples: [
      {
        en: "We should leverage our market presence to launch this new service successfully.",
        zh: "我們應該利用我們的市場影響力來成功推出這項新服務。"
      },
      {
        en: "The company aims to leverage data analytics to improve user experience.",
        zh: "該公司旨在利用數據分析來改善使用者體驗。"
      }
    ]
  },
  {
    word: "initiative",
    pos: "n.",
    phonetic: "/ɪˈnɪʃətɪv/",
    translation: "主動性，新方案，倡議",
    definition: "An act or strategy intended to resolve a difficulty or improve a situation; the ability to assess and initiate things independently.",
    category: "workplace",
    examples: [
      {
        en: "She took the initiative to set up a training program for the new hires.",
        zh: "她主動為新員工制定了培訓計畫。"
      },
      {
        en: "The government launched a green initiative to reduce carbon emissions.",
        zh: "政府發起了一項綠色倡議以減少碳排放。"
      }
    ]
  },
  {
    word: "synergy",
    pos: "n.",
    phonetic: "/ˈsɪnərdʒi/",
    translation: "協同效應，合力",
    definition: "The interaction or cooperation of two or more organizations, substances, or other agents to produce a combined effect greater than the sum of their separate effects.",
    category: "workplace",
    examples: [
      {
        en: "The merger of the two companies created a powerful synergy in research and development.",
        zh: "這兩家公司的合併在研發方面創造了強大的協同效應。"
      },
      {
        en: "We need to foster synergy between the marketing and sales divisions.",
        zh: "我們需要在行銷與業務部門之間培養協同效應。"
      }
    ]
  },
  {
    word: "optimize",
    pos: "v.",
    phonetic: "/ˈɒptɪmaɪz/",
    translation: "優化，使完善",
    definition: "To make the best or most effective use of a situation or resource.",
    category: "workplace",
    examples: [
      {
        en: "We need to optimize our database queries to speed up the website load time.",
        zh: "我們需要優化資料庫查詢以加快網站載入速度。"
      },
      {
        en: "This software helps businesses optimize their supply chain management.",
        zh: "這款軟體能幫助企業優化其供應鏈管理。"
      }
    ]
  },
  {
    word: "compromise",
    pos: "n./v.",
    phonetic: "/ˈkɒmprəmaɪz/",
    translation: "妥協，折衷，讓步",
    definition: "An agreement or a settlement of a dispute that is reached by each side making concessions.",
    category: "workplace",
    examples: [
      {
        en: "After hours of negotiation, both sides finally reached a compromise.",
        zh: "經過數小時的談判，雙方最終達成了妥協。"
      },
      {
        en: "We should not compromise on safety standards just to meet the deadline.",
        zh: "我們不應該僅僅為了趕上截止日期而對安全標準妥協。"
      }
    ]
  },
  {
    word: "implement",
    pos: "v.",
    phonetic: "/ˈɪmplɪment/",
    translation: "實施，執行，落實",
    definition: "To put a decision, plan, or agreement into effect.",
    category: "workplace",
    examples: [
      {
        en: "The HR department will implement the new policy starting next Monday.",
        zh: "人資部門將於下週一開始實施新政策。"
      },
      {
        en: "It is easy to draft a strategy, but harder to implement it effectively.",
        zh: "制定策略很容易，但要有效地執行它卻更難。"
      }
    ]
  },
  {
    word: "consensus",
    pos: "n.",
    phonetic: "/kənˈsensəs/",
    translation: "共識，一致同意",
    definition: "A general agreement among a group of people.",
    category: "workplace",
    examples: [
      {
        en: "The board members reached a consensus on the proposed budget cut.",
        zh: "董事會成員就提議的預算削減達成了一致共識。"
      },
      {
        en: "It is difficult to build a consensus when everyone has different interests.",
        zh: "當每個人都有不同的利益時，很難建立共識。"
      }
    ]
  },
  {
    word: "benchmark",
    pos: "n./v.",
    phonetic: "/ˈbentʃmɑːrk/",
    translation: "基準，參照點，評估基準",
    definition: "A standard or point of reference against which things may be compared or assessed.",
    category: "workplace",
    examples: [
      {
        en: "We use last year's sales figures as a benchmark for our current performance.",
        zh: "我們將去年的銷售數據作為我們當前業績的基準。"
      },
      {
        en: "The company plans to benchmark its services against its main competitors.",
        zh: "該公司計劃將其服務與主要競爭對手進行基準比對。"
      }
    ]
  },
  {
    word: "innovative",
    pos: "adj.",
    phonetic: "/ˈɪnəveɪtɪv/",
    translation: "創新的，新穎的",
    definition: "Featuring new methods; advanced and original.",
    category: "workplace",
    examples: [
      {
        en: "The startup won an award for its innovative approach to waste recycling.",
        zh: "這家新創公司因其創新的垃圾回收方法而獲獎。"
      },
      {
        en: "We are looking for innovative thinkers to join our creative team.",
        zh: "我們正在尋找有創新思維的人加入我們的創意團隊。"
      }
    ]
  },
  {
    word: "delegate",
    pos: "v.",
    phonetic: "/ˈdelɪɡeɪt/",
    translation: "委派，授權，分工",
    definition: "To entrust a task or responsibility to another person, typically one who is less senior.",
    category: "workplace",
    examples: [
      {
        en: "A good manager knows how to delegate tasks effectively to team members.",
        zh: "一位優秀的主管知道如何有效地將任務分派給團隊成員。"
      },
      {
        en: "You cannot do everything yourself; you must learn to delegate.",
        zh: "你不能什麼事都自己做，你必須學會授權。"
      }
    ]
  },
  {
    word: "milestone",
    pos: "n.",
    phonetic: "/ˈmaɪlstəʊn/",
    translation: "里程碑，重要事件",
    definition: "An action or event marking a significant change or stage in development.",
    category: "workplace",
    examples: [
      {
        en: "Launching the product on time was a major milestone for our team.",
        zh: "準時推出產品是我們團隊的一個重要里程碑。"
      },
      {
        en: "We will review the project status at each major milestone.",
        zh: "我們將在每個重要的里程碑節點審查專案進度。"
      }
    ]
  },
  {
    word: "negotiation",
    pos: "n.",
    phonetic: "/nɪˌɡəʊʃiˈeɪʃn/",
    translation: "談判，協商",
    definition: "Discussion aimed at reaching an agreement.",
    category: "workplace",
    examples: [
      {
        en: "The contract is currently under negotiation and should be signed soon.",
        zh: "該合約目前正在談判中，應該很快就會簽署。"
      },
      {
        en: "Good listening skills are essential for successful business negotiation.",
        zh: "良好的傾聽技巧對於成功的商業談判至關重要。"
      }
    ]
  },
  {
    word: "alignment",
    pos: "n.",
    phonetic: "/əˈlaɪnmənt/",
    translation: "一致，協調，對齊",
    definition: "Arrangement in a straight line, or agreement/alliance between groups or ideas.",
    category: "workplace",
    examples: [
      {
        en: "We need to ensure proper alignment between our business goals and IT strategy.",
        zh: "我們需要確保業務目標與資訊科技策略之間保持一致。"
      },
      {
        en: "The project team is in complete alignment on the next steps.",
        zh: "專案團隊對於接下來的步驟達成高度共識（完全一致）。"
      }
    ]
  },
  {
    word: "bottleneck",
    pos: "n.",
    phonetic: "/ˈbɒtlnek/",
    translation: "瓶頸，阻礙",
    definition: "A point of congestion or blockage in a system or process that slows everything down.",
    category: "workplace",
    examples: [
      {
        en: "The lack of staffing in the QA team has become a major bottleneck in our release cycle.",
        zh: "品保團隊人手不足已成為我們發佈週期中的主要瓶頸。"
      },
      {
        en: "We need to identify and eliminate bottlenecks in our production line.",
        zh: "我們需要找出並消除生產線中的瓶頸。"
      }
    ]
  },
  {
    word: "evaluate",
    pos: "v.",
    phonetic: "/ɪˈvæljueɪt/",
    translation: "評估，評價",
    definition: "To form an idea of the amount, number, or value of something; assess.",
    category: "workplace",
    examples: [
      {
        en: "We will evaluate the performance of all employees at the end of the fiscal year.",
        zh: "我們將在財政年度結束時評估所有員工的績效。"
      },
      {
        en: "It is important to evaluate the risks before investing in a new market.",
        zh: "在投資新市場之前評估風險非常重要。"
      }
    ]
  },
  {
    word: "perspective",
    pos: "n.",
    phonetic: "/pəˈspektɪv/",
    translation: "觀點，視角，看法",
    definition: "A particular attitude toward or way of regarding something; a point of view.",
    category: "workplace",
    examples: [
      {
        en: "Bringing in an external consultant can give us a fresh perspective on the issue.",
        zh: "引入外部顧問可以給我們看待這個問題的新視角。"
      },
      {
        en: "From a financial perspective, the project is highly feasible.",
        zh: "從財務角度來看，這個專案是非常可行的。"
      }
    ]
  },
  {
    word: "credentials",
    pos: "n.",
    phonetic: "/krəˈdenʃlz/",
    translation: "憑證，資歷，資格證明",
    definition: "Qualifications, achievements, personal qualities, or aspects of a person's background, typically when used to indicate their suitability for something.",
    category: "workplace",
    examples: [
      {
        en: "Her impressive academic credentials made her the top candidate for the research role.",
        zh: "她令人矚目的學術資歷使她成為這個研究職缺的首選候選人。"
      },
      {
        en: "Please verify the contractor's credentials before granting them access.",
        zh: "在授予存取權限之前，請先核實承包商的憑證。"
      }
    ]
  },
  {
    word: "versatile",
    pos: "adj.",
    phonetic: "/ˈvɜːrsətl/",
    translation: "多才多藝的，多功能的",
    definition: "Able to adapt or be adapted to many different functions or activities.",
    category: "workplace",
    examples: [
      {
        en: "We need a versatile developer who can handle both frontend and backend tasks.",
        zh: "我們需要一位既能處理前端也能處理後端任務的全能型（多才多藝）開發人員。"
      },
      {
        en: "Leather is a versatile material that can be used for clothing, shoes, and furniture.",
        zh: "皮革是一種多用途的材料，可用於衣物、鞋子和家具。"
      }
    ]
  },
  {
    word: "agenda",
    pos: "n.",
    phonetic: "/əˈdʒendə/",
    translation: "議程，待辦清單",
    definition: "A list of items to be discussed at a formal meeting.",
    category: "workplace",
    examples: [
      {
        en: "Could you please send out the agenda for tomorrow's staff meeting?",
        zh: "能否請您發送明天全體員工會議的議程？"
      },
      {
        en: "Reducing operating costs is at the top of the board's agenda.",
        zh: "降低營運成本是董事會議程的首要任務。"
      }
    ]
  },
  {
    word: "brainstorm",
    pos: "v./n.",
    phonetic: "/ˈbreɪnstɔːrm/",
    translation: "腦力激盪，集思廣益",
    definition: "To hold a group discussion to produce ideas and ways of solving problems.",
    category: "workplace",
    examples: [
      {
        en: "Let's gather in the conference room to brainstorm ideas for the holiday marketing campaign.",
        zh: "我們在會議室集合，一起腦力激盪討論節日行銷活動的想法。"
      },
      {
        en: "After a quick brainstorm, we came up with three potential solutions.",
        zh: "經過快速的腦力激盪後，我們想出了三個潛在的解決方案。"
      }
    ]
  },
  {
    word: "brief",
    pos: "v./n.",
    phonetic: "/briːf/",
    translation: "簡報，做簡要介紹；任務說明",
    definition: "To instruct or inform someone thoroughly, especially in preparation for a task; a summary of facts.",
    category: "workplace",
    examples: [
      {
        en: "The manager will brief the team on the new project requirements this afternoon.",
        zh: "經理今天下午將向團隊簡報新專案的要求。"
      },
      {
        en: "He gave me a brief overview of what was discussed during the board meeting.",
        zh: "他向我簡要概述了董事會會議上討論的內容。"
      }
    ]
  },
  {
    word: "mitigate",
    pos: "v.",
    phonetic: "/ˈmɪtɪɡeɪt/",
    translation: "減輕，緩和，降低（風險）",
    definition: "To make something bad less severe, serious, or painful.",
    category: "workplace",
    examples: [
      {
        en: "We must implement emergency backups to mitigate the risk of data loss.",
        zh: "我們必須實施緊急備份以降低（減輕）數據丟失的風險。"
      },
      {
        en: "Soil conservation measures help mitigate the effects of heavy rain.",
        zh: "土壤保護措施有助於減緩暴雨造成的影響。"
      }
    ]
  },
  {
    word: "feasibility",
    pos: "n.",
    phonetic: "/ˌfiːzəˈbɪləti/",
    translation: "可行性，可能性",
    definition: "The state or degree of being easily or conveniently done.",
    category: "workplace",
    examples: [
      {
        en: "We are conducting a feasibility study to see if the market can support a new branch.",
        zh: "我們正在進行一項可行性研究，以了解市場是否能支持開設新分店。"
      },
      {
        en: "The technical feasibility of the plan has been verified by our engineering lead.",
        zh: "該計劃的技術可行性已得到我們工程主管的證實。"
      }
    ]
  },
  {
    word: "feedback",
    pos: "n.",
    phonetic: "/ˈfiːdbæk/",
    translation: "回饋，反饋意見",
    definition: "Information about reactions to a product, a person's performance of a task, etc., used as a basis for improvement.",
    category: "workplace",
    examples: [
      {
        en: "We highly value client feedback because it helps us improve our service quality.",
        zh: "我們非常重視客戶的回饋，因為這能幫助我們改善服務品質。"
      },
      {
        en: "Constructive feedback from your supervisor can accelerate your professional growth.",
        zh: "來自主管的建設性回饋可以加速你的職業成長。"
      }
    ]
  },
  {
    word: "discrepancy",
    pos: "n.",
    phonetic: "/dɪsˈkrepənsi/",
    translation: "差異，不一致，出入",
    definition: "An illogical or surprising lack of compatibility or similarity between two or more facts.",
    category: "workplace",
    examples: [
      {
        en: "There is a minor discrepancy between the sales records and the actual stock in the warehouse.",
        zh: "銷售記錄與倉庫中的實際庫存之間存在些微出入。"
      },
      {
        en: "The audit revealed several financial discrepancies that need immediate investigation.",
        zh: "審計發現了幾處財務上的不一致，需要立即調查。"
      }
    ]
  },
  {
    word: "strategic",
    pos: "adj.",
    phonetic: "/strəˈtiːdʒɪk/",
    translation: "戰略性的，策略性的",
    definition: "Relating to the identification of long-term or overall aims and interests and the means of achieving them.",
    category: "workplace",
    examples: [
      {
        en: "Acquiring that competitor was a strategic move to dominate the regional market.",
        zh: "收購該競爭對手是主導區域市場的戰略性舉措。"
      },
      {
        en: "The company needs a clear strategic vision for the next five years.",
        zh: "該公司需要對未來五年有清晰的戰略願景。"
      }
    ]
  },
  {
    word: "proactive",
    pos: "adj.",
    phonetic: "/ˌprəʊˈæktɪv/",
    translation: "主動的，積極先發制人的",
    definition: "Creating or controlling a situation by causing something to happen rather than responding to it after it has happened.",
    category: "workplace",
    examples: [
      {
        en: "Successful companies take a proactive approach to customer service rather than just responding to complaints.",
        zh: "成功的企業在客戶服務上採取主動出擊的方式，而不仅仅是回應投訴。"
      },
      {
        en: "By being proactive and updating security patches early, we prevented a system breach.",
        zh: "透過積極主動並提早更新安全補丁，我們防止了系統被入侵。"
      }
    ]
  },

  // === DAILY CONVERSATION (30 Words) ===
  {
    word: "spontaneous",
    pos: "adj.",
    phonetic: "/spɒnˈteɪniəs/",
    translation: "自發的，心血來潮的，隨興的",
    definition: "Performed or occurring as a result of a sudden inner impulse or inclination and without premeditation or external stimulus.",
    category: "conversation",
    examples: [
      {
        en: "We didn't plan the trip; it was a spontaneous decision we made over dinner.",
        zh: "我們沒有計畫這次旅行；這是我們在晚餐時做出的隨興決定。"
      },
      {
        en: "The crowd erupted into spontaneous applause when the street musician finished playing.",
        zh: "當街頭藝人演奏結束時，人群中爆發出發自內心的熱烈掌聲。"
      }
    ]
  },
  {
    word: "awkward",
    pos: "adj.",
    phonetic: "/ˈɔːkwərd/",
    translation: "尷尬的，棘手的，笨拙的",
    definition: "Causing or feeling embarrassed or inconvenient; clumsy.",
    category: "conversation",
    examples: [
      {
        en: "There was an awkward silence when nobody answered the host's question.",
        zh: "當沒有人回答主持人的問題時，現場陷入了一陣尷尬的沉默。"
      },
      {
        en: "It felt awkward to run into my ex-boyfriend at the supermarket.",
        zh: "在超市偶遇前男友感覺很尷尬。"
      }
    ]
  },
  {
    word: "empathetic",
    pos: "adj.",
    phonetic: "/ˌempəˈθetɪk/",
    translation: "有同理心的，感同身受的",
    definition: "Showing an ability to understand and share the feelings of another.",
    category: "conversation",
    examples: [
      {
        en: "As a counselor, you need to be an empathetic listener to gain people's trust.",
        zh: "作為一名諮商師，你必須是個有同理心的傾聽者，以贏得人們的信任。"
      },
      {
        en: "She gave her crying friend an empathetic hug.",
        zh: "她給了哭泣的朋友一個充滿同理心與理解的擁抱。"
      }
    ]
  },
  {
    word: "nostalgic",
    pos: "adj.",
    phonetic: "/nɒˈstældʒɪk/",
    translation: "懷舊的，念舊的",
    definition: "Feeling, showing, or causing a sentimental longing or wistful affection for the past.",
    category: "conversation",
    examples: [
      {
        en: "Looking through my old high school yearbook made me feel very nostalgic.",
        zh: "翻看我高中的舊畢業紀念冊讓我感到非常懷舊。"
      },
      {
        en: "The retro design of the cafe gives it a nostalgic charm.",
        zh: "這家咖啡廳的復古設計帶有一種懷舊的魅力。"
      }
    ]
  },
  {
    word: "chaotic",
    pos: "adj.",
    phonetic: "/keɪˈɒtɪk/",
    translation: "混亂的，無秩序的",
    definition: "In a state of complete confusion and disorder.",
    category: "conversation",
    examples: [
      {
        en: "The airport terminal was chaotic due to the sudden flight cancellations.",
        zh: "由於航班突然取消，機場航廈陷入一片混亂。"
      },
      {
        en: "My morning is always chaotic when I forget to set my alarm.",
        zh: "當我忘記定鬧鐘時，我的早晨總是過得一團糟。"
      }
    ]
  },
  {
    word: "hilarious",
    pos: "adj.",
    phonetic: "/hɪˈleəriəs/",
    translation: "極好笑的，滑稽的",
    definition: "Extremely amusing.",
    category: "conversation",
    examples: [
      {
        en: "We watched a comedy show last night, and the lead actor was hilarious.",
        zh: "我們昨晚看了一場喜劇表演，男主角真的超級好笑。"
      },
      {
        en: "He told a hilarious story about his first attempt at baking a cake.",
        zh: "他講了一個關於他第一次嘗試烤蛋糕的爆笑故事。"
      }
    ]
  },
  {
    word: "bizarre",
    pos: "adj.",
    phonetic: "/bɪˈzɑːr/",
    translation: "奇異的，古怪的，異乎尋常的",
    definition: "Very strange or unusual, especially so as to cause interest or amusement.",
    category: "conversation",
    examples: [
      {
        en: "I had a bizarre dream last night where animals could talk and fly.",
        zh: "我昨晚做了一個古怪的夢，夢裡動物們會說話還會飛。"
      },
      {
        en: "It was a bizarre coincidence that we both wore the exact same outfit today.",
        zh: "我們今天居然穿了完全一模一樣的衣服，這真是個奇妙的巧合。"
      }
    ]
  },
  {
    word: "resilient",
    pos: "adj.",
    phonetic: "/rɪˈzɪliənt/",
    translation: "有韌性的，適應力強的，恢復力快的",
    definition: "Able to withstand or recover quickly from difficult conditions.",
    category: "conversation",
    examples: [
      {
        en: "Children are often remarkably resilient and adapt to changes quickly.",
        zh: "孩子們通常非常有韌性，能快速適應變化。"
      },
      {
        en: "The local economy proved resilient despite the global recession.",
        zh: "儘管面臨全球經濟衰退，地方經濟依然表現出強大的韌性。"
      }
    ]
  },
  {
    word: "enthusiastic",
    pos: "adj.",
    phonetic: "/ɪnˌθjuːziˈæstɪk/",
    translation: "熱情的，熱心的，感興趣的",
    definition: "Having or showing intense and eager enjoyment, interest, or approval.",
    category: "conversation",
    examples: [
      {
        en: "The kids were very enthusiastic about going to the amusement park.",
        zh: "孩子們對去遊樂園玩感到非常興奮與期待。"
      },
      {
        en: "He received an enthusiastic welcome from his fans at the airport.",
        zh: "他在機場受到了粉絲們的熱烈歡迎。"
      }
    ]
  },
  {
    word: "cozy",
    pos: "adj.",
    phonetic: "/ˈkəʊzi/",
    translation: "舒適的，溫馨的，暖和的",
    definition: "Giving a feeling of comfort, warmth, and relaxation.",
    category: "conversation",
    examples: [
      {
        en: "We spent a cozy evening sitting by the fireplace, drinking hot cocoa.",
        zh: "我們在壁爐旁喝著熱可可，度過了一個溫馨舒適的夜晚。"
      },
      {
        en: "This small cafe has a very cozy atmosphere.",
        zh: "這家小咖啡館有一種非常溫馨的氛圍。"
      }
    ]
  },
  {
    word: "hectic",
    pos: "adj.",
    phonetic: "/ˈhektɪk/",
    translation: "忙碌的，繁忙喧鬧的",
    definition: "Full of incessant or frantic activity.",
    category: "conversation",
    examples: [
      {
        en: "Life in big cities can be very hectic, so I like to go hiking on weekends.",
        zh: "大城市的生活可能非常忙碌喧囂，所以我喜歡在週末去爬山。"
      },
      {
        en: "It has been a hectic week at school with all the exams going on.",
        zh: "這週因為考試不斷，學校生活過得非常忙碌。"
      }
    ]
  },
  {
    word: "stunning",
    pos: "adj.",
    phonetic: "/ˈstʌnɪŋ/",
    translation: "令人驚艷的，極美的，震驚的",
    definition: "Extremely impressive or attractive.",
    category: "conversation",
    examples: [
      {
        en: "The view from the top of the mountain was absolutely stunning.",
        zh: "從山頂看下去的景色絕對令人屏息（極美）。"
      },
      {
        en: "She looked stunning in her red evening gown.",
        zh: "她穿著紅色的晚禮服看起來漂亮極了。"
      }
    ]
  },
  {
    word: "subtle",
    pos: "adj.",
    phonetic: "/ˈsʌtl/",
    translation: "微妙的，細微的，不易察覺的",
    definition: "So delicate or precise as to be difficult to analyze or describe; understated.",
    category: "conversation",
    examples: [
      {
        en: "There is a subtle difference in flavor between these two types of coffee beans.",
        zh: "這兩種咖啡豆在風味上存在著微妙的差異。"
      },
      {
        en: "She gave me a subtle hint that she wanted to leave the party.",
        zh: "她給了我一個暗示，表示她想離開派對了。"
      }
    ]
  },
  {
    word: "vibe",
    pos: "n.",
    phonetic: "/vaɪb/",
    translation: "氛圍，氣氛，感覺 (常作複數)",
    definition: "A person's emotional state or the atmosphere of a place as communicated to and felt by others.",
    category: "conversation",
    examples: [
      {
        en: "I really like the vibe of this restaurant; the music is nice and relaxed.",
        zh: "我真的很喜歡這家餐廳的氛圍；音樂很好聽且放鬆。"
      },
      {
        en: "She radiates good vibes, making everyone feel comfortable around her.",
        zh: "她散發出滿滿的正能量（良好氣場），讓每個人在她身旁都感到舒適。"
      }
    ]
  },
  {
    word: "mutual",
    pos: "adj.",
    phonetic: "/ˈmjuːtʃuəl/",
    translation: "相互的，彼此的，共同的",
    definition: "Experienced or done by each of two or more parties toward the other or others.",
    category: "conversation",
    examples: [
      {
        en: "Respect is essential for building a strong, mutual friendship.",
        zh: "尊重對於建立深厚且雙方互惠的友誼至關重要。"
      },
      {
        en: "We were introduced to each other by a mutual friend.",
        zh: "我們是由一位共同的朋友介紹認識的。"
      }
    ]
  },
  {
    word: "wanderlust",
    pos: "n.",
    phonetic: "/ˈwɒndəlʌst/",
    translation: "旅遊熱，流浪癖，渴望旅遊的強烈願望",
    definition: "A strong desire to travel.",
    category: "conversation",
    examples: [
      {
        en: "Her wanderlust led her to travel to over thirty countries in five years.",
        zh: "對旅遊的熱愛讓她在五年內旅行了三十多個國家。"
      },
      {
        en: "Looking at travel photos on social media always triggers my wanderlust.",
        zh: "看著社群媒體上的旅遊照片總是勾起我想去旅行的渴望。"
      }
    ]
  },
  {
    word: "exaggerate",
    pos: "v.",
    phonetic: "/ɪɡˈzædʒəreɪt/",
    translation: "誇張，誇大",
    definition: "Represent something as being larger, better, or worse than it really is.",
    category: "conversation",
    examples: [
      {
        en: "Don't exaggerate; the scratch on the car is barely visible.",
        zh: "別誇張了；車身上的刮痕簡直看不出來。"
      },
      {
        en: "He tends to exaggerate his achievements to impress others.",
        zh: "他往往會誇大自己的成就來給別人留下深刻印象。"
      }
    ]
  },
  {
    word: "appreciate",
    pos: "v.",
    phonetic: "/əˈpriːʃieɪt/",
    translation: "感激，欣賞，理解",
    definition: "Value, recognize the full worth of, or be grateful for something.",
    category: "conversation",
    examples: [
      {
        en: "I really appreciate your help with moving the heavy boxes.",
        zh: "我真的很感激你幫我搬運那些沉重的箱子。"
      },
      {
        en: "It takes time to appreciate classical music.",
        zh: "需要時間才能學會欣賞古典音樂。"
      }
    ]
  },
  {
    word: "casual",
    pos: "adj.",
    phonetic: "/ˈkæʒuəl/",
    translation: "休閒的，非正式的，隨意的",
    definition: "Relaxed and unconcerned; informal; suitable for everyday wear.",
    category: "conversation",
    examples: [
      {
        en: "The dress code for the party is casual, so you can just wear jeans.",
        zh: "派對的著裝要求是休閒服，所以你穿牛仔褲就行了。"
      },
      {
        en: "They had a casual conversation about their weekend plans over coffee.",
        zh: "他們一邊喝咖啡，一邊隨意聊著週末的計劃。"
      }
    ]
  },
  {
    word: "exhausted",
    pos: "adj.",
    phonetic: "/ɪɡˈzɔːstɪd/",
    translation: "筋疲力竭的，疲憊不堪的",
    definition: "Very tired, either physically or mentally.",
    category: "conversation",
    examples: [
      {
        en: "I was completely exhausted after running the half marathon.",
        zh: "跑完半程馬拉松後，我整個人筋疲力竭。"
      },
      {
        en: "She felt mentally exhausted after working ten hours straight.",
        zh: "連續工作十個小時後，她感到心力交瘁。"
      }
    ]
  },
  {
    word: "clumsy",
    pos: "adj.",
    phonetic: "/ˈklʌmzi/",
    translation: "笨拙的，手腳不靈活的",
    definition: "Awkward in movement or in handling things.",
    category: "conversation",
    examples: [
      {
        en: "I'm so clumsy; I just spilled coffee all over my keyboard.",
        zh: "我真的好笨手笨腳；我不小心把咖啡灑得滿鍵盤都是。"
      },
      {
        en: "He made a clumsy attempt to catch the falling glass.",
        zh: "他手腳笨拙地試圖接住掉落的玻璃杯。"
      }
    ]
  },
  {
    word: "curious",
    pos: "adj.",
    phonetic: "/ˈkjʊəriəs/",
    translation: "好奇的，想知道的",
    definition: "Eager to know or learn something.",
    category: "conversation",
    examples: [
      {
        en: "Puppies are naturally curious about everything in their environment.",
        zh: "小狗天生對周圍環境中的一切都充滿好奇心。"
      },
      {
        en: "I'm curious to know why she decided to move abroad.",
        zh: "我很想知道她為什麼決定搬到國外去。"
      }
    ]
  },
  {
    word: "sarcastic",
    pos: "adj.",
    phonetic: "/sɑːˈkæstɪk/",
    translation: "諷刺的，挖苦的",
    definition: "Marked by or given to using irony in order to mock or convey contempt.",
    category: "conversation",
    examples: [
      {
        en: "She didn't appreciate his sarcastic remarks about her cooking.",
        zh: "她不喜歡他對她廚藝的諷刺話語。"
      },
      {
        en: "His tone was sarcastic when he said, 'Oh, great, another meeting.'",
        zh: "當他說「哦，太棒了，又要開會」時，口氣十分諷刺。"
      }
    ]
  },
  {
    word: "gorgeous",
    pos: "adj.",
    phonetic: "/ˈɡɔːdʒəs/",
    translation: "極美的，美麗動人的，華麗的",
    definition: "Beautiful; very attractive; magnificent.",
    category: "conversation",
    examples: [
      {
        en: "We sat on the beach and watched a gorgeous sunset.",
        zh: "我們坐在沙灘上，看著美麗動人的落日。"
      },
      {
        en: "The flowers in the botanical garden look absolutely gorgeous this spring.",
        zh: "今年春天植物園裡的花朵看起來美極了。"
      }
    ]
  },
  {
    word: "stereotype",
    pos: "n./v.",
    phonetic: "/ˈsteriətaɪp/",
    translation: "刻板印象，成見；使模式化",
    definition: "A widely held but fixed and oversimplified image or idea of a particular type of person or thing.",
    category: "conversation",
    examples: [
      {
        en: "We need to break the gender stereotype that only men can excel in science.",
        zh: "我們需要打破「只有男性才能在科學領域表現出色」的性別刻板印象。"
      },
      {
        en: "It is unfair to stereotype people based on their nationality.",
        zh: "根據國籍對人們產生刻板成見是不公平的。"
      }
    ]
  },
  {
    word: "spoil",
    pos: "v.",
    phonetic: "/spɔɪl/",
    translation: "破壞，寵壞，食物變質",
    definition: "Diminish or destroy the value or quality of; harm the character of a child by being too lenient; decay.",
    category: "conversation",
    examples: [
      {
        en: "Don't let a small argument spoil the entire evening.",
        zh: "別讓小小的爭吵破壞了整個晚上的氣氛。"
      },
      {
        en: "The grandparents tend to spoil the kids with too many toys.",
        zh: "祖父母往往會用太多玩具把孩子們寵壞。"
      }
    ]
  },
  {
    word: "skeptical",
    pos: "adj.",
    phonetic: "/ˈskeptɪkl/",
    translation: "懷疑的，持保留態度的",
    definition: "Not easily convinced; having doubts or reservations.",
    category: "conversation",
    examples: [
      {
        en: "I'm skeptical about his promise to finish the work by tomorrow.",
        zh: "我對他明天前能完成工作的保證持懷疑態度。"
      },
      {
        en: "Scientists are naturally skeptical and require solid evidence to accept new theories.",
        zh: "科學家天生抱持懷疑精神，需要確鑿的證據來接受新理論。"
      }
    ]
  },
  {
    word: "dramatic",
    pos: "adj.",
    phonetic: "/drəˈmætɪk/",
    translation: "戲劇性的，誇張的，顯著的",
    definition: "Sudden and striking; relating to drama; exaggerating circumstances.",
    category: "conversation",
    examples: [
      {
        en: "There has been a dramatic increase in temperature over the past decade.",
        zh: "過去十年間，溫度出現了顯著的上升。"
      },
      {
        en: "Stop being so dramatic; it was just a minor scratch, not the end of the world.",
        zh: "別那麼大驚小怪（誇張戲劇化）了；那只是一道小刮痕，又不是世界末日。"
      }
    ]
  },
  {
    word: "random",
    pos: "adj.",
    phonetic: "/ˈrændəm/",
    translation: "隨機的，任意的，出乎意料的",
    definition: "Made, done, happening, or chosen without method or conscious decision.",
    category: "conversation",
    examples: [
      {
        en: "The computer generated a list of random numbers.",
        zh: "電腦生成了一串隨機數字。"
      },
      {
        en: "A random stranger helped me carry my luggage up the stairs.",
        zh: "一個不認識的陌生人隨機走來，幫我把行李搬上了樓梯。"
      }
    ]
  },
  {
    word: "empathy",
    pos: "n.",
    phonetic: "/ˈempəθi/",
    translation: "同理心，共鳴",
    definition: "The ability to understand and share the feelings of another.",
    category: "conversation",
    examples: [
      {
        en: "Developing empathy helps us connect with people from diverse backgrounds.",
        zh: "培養同理心能幫助我們與來自不同背景的人建立連結。"
      },
      {
        en: "The novel teaches empathy by showing the world through a child's eyes.",
        zh: "這本小說透過一個孩子的眼睛看世界，教導人們學會同理心。"
      }
    ]
  }
];

// Support both ES module import and direct script loading
if (typeof module !== 'undefined' && module.exports) {
  module.exports = VOCAB_DATABASE;
}
