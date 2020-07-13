/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */


module.exports = function (controller) {
  controller.on("message,direct_message", async (bot, message) => {
    await bot.reply(message,{type: 'typing'});
    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message,"Tumhara Puraana yaar Mc Dowells No1 ab badal ke New No1 ban gaya hai");
      await bot.reply(message,{type: 'typing'});
      setTimeout(async () => {
        await bot.changeContext(message.reference);
        bot.say(`Chalo New yaari ki Shurwaat Iss No1 adde pe kare`);
        await bot.reply(message,{type: 'typing'});
        setTimeout (async () => {
          await bot.beginDialog("customer-chat", {});
        },1500)
        
      },1500)
    
    },1500)
  });
};
