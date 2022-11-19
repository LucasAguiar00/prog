function startTimer(duration, display,contador_msg) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = "Sua próxima pausa será em: "+ minutes + ":" + seconds;
        if (--timer < 0) {
            //timer = duration;
            display.textContent = "Acabou";
            if (contador_msg == true){
                msg_alerta()
                contador_msg = false
            }                        
        }
    }, 1000);
}
window.onload = function () {
    //var duration = 60 * 5; // Converter para segundos
    var duration = 3; // Converter para segundos
    var contador_msg = true; // Se true o alerta é exibido
        display = document.querySelector('#timer'); // selecionando o timer
    startTimer(duration, display,contador_msg); // iniciando o timer
};


function msg_alerta(){
    //window.alert("Sua pausa agora")


    Notification.requestPermission(/* opcional: callback */);
    
    var notification = new Notification("Título", {
        icon: 'http://i.stack.imgur.com/dmHl0.png',
        body: "Texto da notificação"
    });
    notification.onclick = function() {
        window.open("http://stackoverflow.com");
    }

}