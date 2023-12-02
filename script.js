
let bothTabsOpen=false
        
        let words=[
        "apple", "slave", "chess", "daisy", "eagle",
        "fudge", "grape", "house", "igloo", "joker",
        "kiosk", "lemon", "mango", "nurse", "ocean",
        "peach", "queen", "ruler", "snake", "trick",
        "umbra", "viper", "waltz", "xenon", "yield",
        "zebra", "cloud", "flint", "grain", "hedge",
        "inbox", "juice", "knife", "latch", "melon",
        "noble", "piano", "quilt", "rider", "stork",
        "table", "usher", "vault", "wrist", "xenon",
        "young", "zebra", "cloak", "flame", "grape",
        "abide", "bliss", "cider", "dwell", "elite",
        "flair", "greet", "hexed", "inset", "jolly",
        "knack", "latch", "melon", "noble", "oasis",
        "plush", "quake", "radar", "swirl", "tramp",
        "ultra", "vivid", "woven", "xerox", "yield",
        "zebra", "blaze", "coast", "frost", "grind",
        "hoard", "input", "juice", "kudos", "liver",
        "mirth", "nudge", "ocean", "pluck", "query",
        "swoop", "trail", "upend", "vista", "wrist",
        "xenon", "yacht", "blind", "crave", "dealt",
        "arrow", "badge", "beach", "black", "bloom",
        "bread", "bride", "brick", "brown", "bunch",
        "cabin", "cagey", "candy", "cease", "chair",
        "charm", "cheap", "cheer", "chief", "climb",
        "cloud", "coach", "coast", "craft", "crane",
        "dance", "dandy", "demon", "dizzy", "dream",
        "dwarf", "eager", "early", "earth", "easel",
        "evoke", "feast", "fever", "flock", "float",
        "flute", "frail", "fresh", "froze", "globe",
        "glory", "grain", "green", "grind", "happy",
        "heart", "honey", "honor", "hurry", "sunny"
    ]
    let showing = true;
    let randomNumber=Math.floor(Math.random()*150);
    let guessThis =words[randomNumber]
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+guessThis)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            $('.searchedDefinition').text(data[0].meanings[0].definitions[0].definition) // Do something with the data
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
        const googleSearch=()=>{
            if($('.bar').val()!==guessThis){
                fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+$('.bar').val())
                    .then(response => {
                        if (!response.ok) {
                            $('.searchedDefinition').text("Looks like you tried to search a non-existing word, try removing all punctionation and look up one word at a time (check your spelling also)!");
                            $('.searchedWord').text($('.bar').val());
                            
                            }
                            return response.json(); // Parse the response as JSON
                        })
                        .then(data => {
                            $('.searchedDefinition').text(data[0].meanings[0].definitions[0].definition) // Do something with the data
                            $('.searchedWord').text($('.bar').val())
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                            }
                        }
        $('.searchButton').click(()=>{
            googleSearch()
        })
        $(document).on('keypress',(e)=>{
            if (e.which===13){
                if($('.bar').is(":focus")){
                    e.preventDefault()
                    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+$('.bar').val())
                    .then(response => {
                        if (!response.ok) {
                            $('.searchedDefinition').text("Looks like you tried to search a non-existing word, try removing all punctionation and look up one word at a time (check your spelling also)!");
                            $('.searchedWord').text($('.bar').val());
                            
                            }
                            return response.json(); // Parse the response as JSON
                        })
                        .then(data => {
                            $('.searchedDefinition').text(data[0].meanings[0].definitions[0].definition) // Do something with the data
                            $('.searchedWord').text($('.bar').val())
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                            }
                        
                else{
                checkAnswers();
                }
            }
        })
        $('.final').click(()=>{
        checkAnswers();
        
        })
        $('.reset').click(()=>{
            resetBoard();
        })
        const addNumber=()=>{
            
            txt2=document.createElement('p');
            txt2.innerHTML=guessThis;
            $('body').append(txt2)
        }
        const checkAnswers=()=>{
            
            let allInput=[$('.1'),$('.2'),$('.3'),$('.4'),$('.5')]
            let newGuess=document.createElement('p')
            newGuess.innerHTML=allInput[0].val()+allInput[1].val()+allInput[2].val()+allInput[3].val()+allInput[4].val()
            newGuess.style.color='white'
            newGuess.style.paddingLeft='11px'
            $('.tv-bottom').append(newGuess)
            for(let i =0;i<allInput.length;i++){
                if (allInput[i].val()===guessThis[i]){
                    
                    allInput[i].animate({'background-color':'green'},700)
                
                }
                else if(guessThis.includes(allInput[i].val())&& allInput[i].val()!==''){
                    allInput[i].animate({'background-color':'yellow'},700)
                    allInput[i].val('')
                }
                else{
                    
                    allInput[i].animate({'background-color':'red'},700);
                    allInput[i].val('')
                }
                
            }
            for(let i =0;i<allInput.length;i++){
                if (allInput[i].val()===guessThis[i]){
                    
                    continue
                
                }
                else if(guessThis.includes(allInput[i].val())&& allInput[i].val()!==''){
                    
                    allInput[i].val('')
                    allInput[i].focus()
                    break
                }
                else{
                    
                    
                    allInput[i].val('')
                    allInput[i].focus()
                    break
                }
                
            }
            
        }
        const resetBoard=()=>{
            let allInput=[$('.1'),$('.2'),$('.3'),$('.4'),$('.5')]
            for(let i =0;i<allInput.length;i++){
                allInput[i].val('')
                allInput[i].animate({'background-color':'white'},700)
                $('.tv-bottom').text('')
            }
            randomNumber=Math.floor(Math.random()*150);
            guessThis =words[randomNumber]
            fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+guessThis)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                        }
                        return response.json(); // Parse the response as JSON
                    })
                    .then(data => {
                        $('.searchedDefinition').text(data[0].meanings[0].definitions[0].definition) // Do something with the data
                        $('.searchedWord').text('hmmmm')
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                    }
        $('.green').click(()=>{
            $(".tv-container").animate({width: '570px',
                height: '350px',
                top:'0',
                left:'0',
                'font-size':'22px'
            })
            $('.get-help').hide()
        })
        $('.yellow').click(()=>{
            $(".tv-container").animate({width: '400px',
                height: '200px',
                top:'30px',
                left:'30px',
                'font-size':'18px'
            })
            $('.get-help').show()
        })
        $('.red').click(()=>{
            if(showing){
                $(".tv-container").animate({width: '400px',
                height: '0px',
                width:'0px',
                top:'30px',
                left:'30px',
                'font-size':'18px',
                'opacity':0
            })
            $('.file-folder').animate({'opacity':'1'},700)
            $('.used').css('background-color','gray')
            $('.get-help').show()
            showing = !showing
            bothTabsOpen=false
        }
        
        })
        $(".file-folder").dblclick(()=>{
            if(!showing){
                
                $(".tv-container").animate({width: '400px',
                height: '200px',
                width:'400px',
                top:'30px',
                left:'30px',
                'font-size':'18px',
                'opacity':1
            })
            $('.file-folder').animate({'opacity':'0'},200)
            $('.get-help').show()
            showing=!showing
            if($('.google-chrome').css('height')!=='0px'){
                bothTabsOpen=true
                
                
                }
            }
        })
        
        let hdImages = ["url('./assets/hdimma.png')","url('./assets/hdimma2.jpeg')",
            "url('./assets/hdimma3.jpeg')","url('./assets/hdimma4.jpeg')","url('./assets/hdimma5.png')",
            "url('./assets/hdimma6.jpeg')","url('./assets/hdimma7.webp')"]
        $('.guesses').css('background-image',hdImages[ Math.floor(Math.random()*7)])
        $('.file-folder').click(()=>{
            $('.used').css('background-color','blue')
            $('.def-hint').css('background-color','gray')
        })
        const forfeit =()=>{
            $('.1').val(guessThis[0]);
            $('.2').val(guessThis[1]);
            $('.3').val(guessThis[2]);
            $('.4').val(guessThis[3]);
            $('.5').val(guessThis[4]);
            checkAnswers();
        }
        $('.giveUp').click(()=>forfeit())
        $('.final').hover(()=>{
            $('.dot').animate({left:'113px',opacity:'1'},400,()=>{
                
                                $('.dot').animate({left:'23px',opacity:'0'})
                            })
                        },()=>{
                            $('.dot').animate({left:'23px',opacity:'0'})
                        })
        $('.reset').hover(()=>{
            $('.filler').animate({width:'40%',left:'0px'},()=>{
                $('.filler').animate({left:'40px'})
                $('.span-reset').animate({color:'black'},()=>{
                    $('.reset').animate({color:'white'})
                })

            })
        },()=>{
            $('.filler').animate({left:'0px'})
            $('.span-reset').animate({color:'black'},()=>{
                $('.filler').animate({width:'100%',left:'0px'})
                $('.reset').animate({color:'black'})
            })
        })
        $('.giveUp').hover(()=>{
            $('.filler2').animate({width:'40%',left:'0px'},()=>{
                $('.filler2').animate({left:'40px'})
                $('.span-reset2').animate({color:'black'},()=>{
                    $('.giveUp').animate({color:'white'})
                })

            })
        },()=>{
            $('.filler2').animate({left:'0px'})
            $('.span-reset2').animate({color:'black'},()=>{
                $('.filler2').animate({width:'100%',left:'0px'})
                $('.giveUp').animate({color:'black'})
            })
        })
        $('.1').keyup(()=>{
            
            if($('.1').val().length===1){
                $('.2').focus()
            }
        })
        $('.2').keyup(()=>{
            
            if($('.2').val().length===1){
                $('.3').focus()
            }
        })
        $('.3').keyup(()=>{
            
            if($('.3').val().length===1){
                $('.4').focus()
            }
        })
        $('.4').keyup(()=>{
            
            if($('.4').val().length===1){
                $('.5').focus()
            }
        })
        $('.get-help').click(()=>{
            $('.def-hint').css('background-color','blue')
            $('.used').css('background-color','gray')
        })
        
        $('.green-chrome').click(()=>{
            $(".google-chrome").animate({width: '570px',
                height: '350px',
                top:'0',
                left:'0',
                'font-size':'22px'
            })
            $('.get-help').hide()
            
            $('.bar').animate({width:'250px'})
            if(!showing){
                $('.file-folder').animate({'opacity':'0'},200)
                
            }
        })
        $('.yellow-chrome').click(()=>{
            $(".google-chrome").animate({width: '400px',
                height: '200px',
                top:'145px',
                left:'70px',
                'font-size':'18px'
            })
            $('.get-help').show()
            
            $('.bar').animate({width:'180px'})
            if(!showing&&!bothTabsOpen){
                $('.file-folder').animate({'opacity':'1'},200)
                
            }
        })
        let dark_light=false;
        $('.hidden-option').hide()
        $('.setz').click(()=>{
            if (dark_light){
                $('.hidden-option').hide()
                dark_light=!dark_light
            }
            else{
                $('.hidden-option').show()
                dark_light=!dark_light
            }
        })
        let lightMode=true
        $('.hidden-option').click(()=>{
            if (dark_light){
                $('.hidden-option').hide()
                dark_light=!dark_light
            }
            else{
                $('.hidden-option').show()
                dark_light=!dark_light
            }
            if (lightMode){
                $('.results').css('color','white')
                $('.searchedWord').css('color','white')
                $('.searchedDefinition').css('color','white')
                $('.google-chrome').css('background-color','#333')
                $('.hidden-option').text('Light Mode')
                $('.bar').css('background-color','#555')
                $('.bar').css('color','white')
                $('.bar').css('box-shadow','1px 1px 5px black')
                lightMode=!lightMode
            }
            else{
                $('.results').css('color','black')
                $('.searchedWord').css('color','slategray')
                $('.searchedDefinition').css('color','rgb(80, 92, 104)')
                $('.google-chrome').css('background-color','white')
                $('.hidden-option').text('Dark Mode')
                $('.bar').css('background-color','white')
                $('.bar').css('color','black')
                lightMode=!lightMode
            }
        })
        $('.tv-container').click(()=>{
            $('.tv-container').css('z-index','100')
            $('.google-chrome').css('z-index','99')
        })
        $('.google-chrome').click(()=>{
            $('.google-chrome').css('z-index','100')
            $('.tv-container').css('z-index','99')
        })
        $('.red-chrome').click(()=>{
            $('.google-chrome').animate({'height':'0px',
                'width':"0px",
            })
            $('.get-help').show()
            bothTabsOpen=false
            if(showing){
                $('.tv-container').show()
            }
            else{
                $('.file-folder').animate({'opacity':'1'},200)
            }
        })
        $('.get-help').dblclick(()=>{
            
            $('.google-chrome').animate({'height':'200px',
                'width':"400px",
                'top':'145px',
                'left':'70px'
                ,'font-size':'18px'
            })
            $('.bar').animate({'width':'180px'})
            if($(".tv-container").css('height')!=='0px'){
            bothTabsOpen=true;
            
            }
        })