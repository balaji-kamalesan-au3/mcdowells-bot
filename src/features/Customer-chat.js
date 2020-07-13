const { BotkitConversation } = require("botkit");

module.exports = (controller) => {
    let customerDataConvo = new BotkitConversation("customer-chat",controller)
    
    customerDataConvo.addAction("entryInfo");

    customerDataConvo.addQuestion({
      text: "Are you over 25 years of age?",
      quick_replies: [
          {
              title: 'Yes',
              payload: 'yes',
          },
          {
              title: 'No',
              payload: 'no',
          }
      ]
  },
    [{
        pattern: new RegExp('yes'),
        handler: async (response, convo, bot) => {
          await convo.gotoThread('ageOver25-1')
        },
      },
      {
        pattern: new RegExp('no'),
        handler: async (response, convo, bot) => {
          // bot.say({type : 'typing'})
          convo.gotoThread("ageBelow25")
        }
      },
    ], "age","entryInfo");

    customerDataConvo.addMessage("Sorry yaar. Participation age for the New No1 Adda is 25 years and above. Phir Milenge", "ageBelow25");
    customerDataConvo.addMessage("Pataa hai.. New No1 ka taste ab ho gaya hai Better Balanced, Rich aroma aut feel ka saat","ageOver25-1")
    customerDataConvo.addAction("ageOver25-2","ageOver25-1");
    
    
    customerDataConvo.addMessage({
      text: `<video width="320" height="240" controls controlsList="nodownload">
      <source src="https://s3-ap-south-1.amazonaws.com:443/bot-bkt/prod/38270/38270-Consumer%20AV%20English%20Version%20%281%29.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>`
    },"ageOver25-2");
    customerDataConvo.addAction("ageOver25-3","ageOver25-2");
    customerDataConvo.addMessage("Yakin nahin aata? Toh phir yeh dekho.","ageOver25-3")
    customerDataConvo.addAction("ageOver25-4","ageOver25-3");
    customerDataConvo.addQuestion({
      text: "Aage  badhne Ke liye neeche button click karein",
      quick_replies: [
          {
              title: 'Ok',
              payload: 'ok',
          },
      ],
    },
    async (response, convo, bot) => {
      await convo.gotoThread("afterVideo-1")
    },
    "ok","ageOver25-4"
    )
    customerDataConvo.addMessage("Toh aaj yaaron ke saath New No1 Try karo","afterVideo-1");
    customerDataConvo.addAction("afterVideo-2","afterVideo-1")
    customerDataConvo.addMessage("Lekin is New Yaari ke pal ko khaas banaye jaye?","afterVideo-2");
    customerDataConvo.addAction("afterVideo-3","afterVideo-2")
    customerDataConvo.addMessage("Idea! No1 yaari songs ke saath.","afterVideo-3");
    customerDataConvo.addAction("afterVideo-4","afterVideo-3")
    customerDataConvo.addQuestion({
      text: "Free No1 Yaari playlist ke liye apna mobile number type kijiye",
      quick_replies: [
          {
              title: 'Yes',
              payload: 'yes',
          },
          {
              title: 'No',
              payload: 'no',
          }
      ]},  
      [{
        pattern: new RegExp('yes'),
        handler: async (response, convo, bot) => {
          await convo.gotoThread("mobileNumber")
        },
      },
      {
        pattern: new RegExp('no'),
        handler: async (response, convo, bot) => {
          await convo.gotoThread("noMobile-1")
        },
      },
    ],"playListNeed","afterVideo-4"
  )

    customerDataConvo.addQuestion("Mobile Number type kijiye",
    async (response, convo, bot) => {

      await convo.gotoThread("afterMobileNumber-1")
    },"mobile","mobileNumber")

    // When interested to give mobile number
    customerDataConvo.addMessage("Yeh raha aapka No1 yaari Playlist <a href=https://www.youtube.com/playlist?list=PLyrRbDWT0X44a0sg7vr3kaIcKXX7wdPbw>https://www.youtube.com/playlist?list=PLyrRbDWT0X44a0sg7vr3kaIcKXX7wdPbw</a>  ","afterMobileNumber-1");
    customerDataConvo.addAction("afterMobileNumber-2","afterMobileNumber-1");
    customerDataConvo.addMessage("Download bhi karnaa hai?","afterMobileNumber-2");
    customerDataConvo.addAction("afterMobileNumber-3","afterMobileNumber-2");
    customerDataConvo.addMessage("Ok yeh lo link  <a href='https://www.hungama.com/playlists/no-1-yaari-jam/69862/'> https://www.hungama.com/playlists/no-1-yaari-jam/69862/ </a> ","afterMobileNumber-3");
    customerDataConvo.addAction("afterMobileNumber-4","afterMobileNumber-3");
    customerDataConvo.addMessage("Thank You new No1 Adde mein phit milenge","afterMobileNumber-4")

    // When says he does not want to give mobile number
    customerDataConvo.addMessage("Thank You. New No1 Adde mein phir milenge. Tab tak ke liye enjoy New No1 with No1 yaari playlist","noMobile-1");
    customerDataConvo.addAction("noMobile-2","noMobile-1")
    customerDataConvo.addMessage({
      text : 'Link for No1 yaari Playlist <a href=https://www.hungama.com/playlists/no-1-yaari-jam/69862/> https://www.hungama.com/playlists/no-1-yaari-jam/69862/ </a>'
    },
     "noMobile-2");
     customerDataConvo.addAction("noMobile-3","noMobile-2")
    customerDataConvo.addMessage("Thank You new No1 Adde mein phit milenge","noMobile-3")


    // Typing Delays for each dialogs


    customerDataConvo.addMessage({type: 'typing'}, 'typing');
    customerDataConvo.before('ageOver25',  async () => {
      return new Promise((resolve) => {
          // simulate some long running process
          setTimeout(resolve, 3000);
      });
    });
    customerDataConvo.before('ageBelow25',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 3000);
      });
    });

    customerDataConvo.before('ageOver25-1',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('ageOver25-2',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('ageOver25-3',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('ageOver25-4',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
  
    customerDataConvo.before('afterVideo-1',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('afterVideo-2',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('afterVideo-3',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('afterVideo-4',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('mobileNumber',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('afterMobileNumber-1',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('afterMobileNumber-4',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });customerDataConvo.before('afterMobileNumber-2',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('afterMobileNumber-3',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('noMobile-1',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('noMobile-2',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });
    customerDataConvo.before('noMobile-3',  async (covo,bot) => {
      bot.say({type : "typing"})
      return new Promise((resolve) => {
          // simulate some long running process
      
          setTimeout(resolve, 1500);
      });
    });



    controller.addDialog(customerDataConvo);
}