const app = new Vue({
    el: "#root",
    data: {
        active: 0,
        newMessage: "",
        contactSearch: "",
        contattiFiltrati: this.contacts,
        messageActive: {
            index: false,
            show: false
        },
        contacts: [
            {
                name: 'Michele',
                avatar: 'img/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent',
                        showOptions: false
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                        showOptions: false
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received',
                        showOptions: false
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: 'img/avatar_2.jpg',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent',
                        showOptions: false
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received',
                        showOptions: false
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent',
                        showOptions: false
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: 'img/avatar_3.jpg',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received',
                        showOptions: false
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent',
                        showOptions: false
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received',
                        showOptions: false
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: 'img/avatar_4.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent',
                        showOptions: false
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received',
                        showOptions: false
                    }
                ],
            },
            {
                name: 'Pippo',
                avatar: 'img/avatar_5.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai mangiato tutto il piatto?',
                        status: 'sent',
                        showOptions: false
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si non preoccuparti',
                        status: 'received',
                        showOptions: false
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received',
                        showOptions: false
                    }
                ],
            },
            {
                name: 'Luigi',
                avatar: 'img/avatar_6.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Vorrei comprarle quella borsa particolare',
                        status: 'sent',
                        showOptions: false
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Secondo te superiamo il nostro budget?',
                        status: 'sent',
                        showOptions: false
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Vai tranquillo, ho già controllato :)',
                        status: 'received',
                        showOptions: false
                    }
                ],
            },
        ]    
    },
    methods:{

        //metodo che segna il contatto attivo, modificando la variabile active con l'indice appropriato
        setActive(index){
            this.active = index;
        },


        //funzione che viene chiamata quando mandiamo un nuovo messaggio
        addMessage(listaMessagiAttiva){
            if(this.newMessage != ""){

                //aggiungo un nuovo oggetto messaggio, che sarà ciò che ho scritto nell'input
                this.contacts[listaMessagiAttiva].messages.push({
                    date: dayjs().format("DD/MM/YY HH:mm"),
                    text: this.newMessage,
                    status: "sent",
                    showOptions: false
                });

                //svuoto nuovamente l'input
                this.newMessage = "";

                //chiamo la funzione che mi manderà la risposta dopo 1 secondo
                setTimeout(this.RispostaInterlocutore, 1000, listaMessagiAttiva);

                //variabile per scrollare automaticamente la scrollbar giù quando si manda/riceve un messaggio
                let contenitoreMessagi = this.$el.querySelector(".messages-container");
                contenitoreMessagi.scrollTop = contenitoreMessagi.scrollHeight;

            }
        },

        //funzione che genera una risposta random tra quelle nela lista, e pusha l'oggetto nella lista messaggi attiva
        RispostaInterlocutore(listaMessagiAttiva){
            let listaRisposte = ["ok", "ciao", "purtroppo non posso", "va bene", "xD", "lol"];

            let rispostaACaso = Math.floor(Math.random() * listaRisposte.length);
            
            this.contacts[listaMessagiAttiva].messages.push({
                date: dayjs().format("DD/MM/YY HH:mm"),
                text: listaRisposte[rispostaACaso],
                status: "received",
                showOptions: false
            });


            let contenitoreMessagi = this.$el.querySelector(".messages-container");
            contenitoreMessagi.scrollTop = contenitoreMessagi.scrollHeight;

        },

        //funzione che filtra i contatti in base a ciò che l'utente inserisce nell'input di ricerca
        filtraContatti(){

            if(this.contactSearch != ""){

                this.contattiFiltrati = this.contacts.filter((contatto) => {

                    //se il nome del singolo contatto include ciò che l'utente scrive, allora quel contatto rimarrà nei contatti filtrati. Altrimenti scompare
                    if(contatto.name.toLowerCase().includes(this.contactSearch)){
                        return true;
                    }else{
                        return false;
                    }
                });

                /* for(let i = 0; i < this.contacts.length; i++){
                    if(this.contacts[i].name.toLowerCase().includes(this.contactSearch)){
                        this.contacts[i].visible = false;
                        this.contactSearch = "";
                    }
                } */

                
            }else{
                //se l'input è vuota allora i contatti filtrati non filtrano nulla
                this.contattiFiltrati = this.contacts;
            }
        },

        //funzione per mostrare le opzioni aggiuntive di un messaggio
        mostraOpzioni(index){

            //variabile booleana "showOptions" aggiunta nell'oggetto messages che rappresenta un flag delle opzioni avanazate del messaggio
            /* if(message.showOptions == false){
                this.$el.querySelectorAll(".message-info")[index].style = "display:block;";
                message.showOptions = true;
            }else{
                this.$el.querySelectorAll(".message-info")[index].style = "display:none;";
                message.showOptions = false;
            } */

            if(this.messageActive.index != false && this.messageActive.index != index){
                this.messageActive.show = false;
                this.messageActive.index = false;
            }

            this.messageActive.show = (this.messageActive.show) ? false : true;
            this.messageActive.index = index;
        },


        //funzione di cancellazione del messaggio selezionato
        deleteMessage(index){
            /* if(messagesList.length == 1){
                messagesList.pop();
                console.log(messagesList);
            }else{
                messagesList.splice(index, 1);
                console.log(messagesList);
            } */

            this.contacts[this.active].messages.splice(index, 1);
            this.messageActive.show = false;
            this.messageActive.index = false;
        }


    },

    //all'esecuzione del programma svolgo la funzione, così da stampare i contatti la prima volta
    beforeMount(){
        this.filtraContatti();
    }
});