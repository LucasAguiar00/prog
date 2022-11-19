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
        icon: 'https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Fbr%2Ficone-gratis%2Frelogio-de-parede_1648302&psig=AOvVaw0ggnGCI2gHdDEFi6XvWvia&ust=1668906504718000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNjCv6yHufsCFQAAAAAdAAAAABAE',
        body: "Hora de sair..."
    });
    notification.onclick = function() {
        window.open("http://stackoverflow.com");
    }

}