let button = $('.answer');
let user_input = $('.field');
let chatlog = $('.chatlog');
let maskUser = `<div class="chat user">
                    <div class="user-av"></div>
                    <p class="chat-mes-user"></p>
                </div>`;

let maskBot = `<div class="chat bot">
                    <div class="user-av"></div>
                    <p class="chat-mes-bot"></p>
                </div>`;

var bot = new RiveScript({utf8: true});
bot.unicodePunctuation = new RegExp(/[.,!?;:]/g);

bot.loadFile("brain.rive").then(loading_done).catch(loading_error);

function loading_done() {
    bot.sortReplies();

}

function loading_error() {
    alert('Бот не отвечает');
}

button.click(chat);

function chat() {
    let username = "local-user";
    
    chatlog.append(maskUser);
    let outputUser = $('.chat-mes-user').last();
    let input = user_input.val();
    outputUser.html(input);

    chatlog.append(maskBot);
    let outputBot = $('.chat-mes-bot').last();
    bot.reply(username, input).then(function (reply) {
        outputBot.html(reply);
    });

    user_input.val('');;

}