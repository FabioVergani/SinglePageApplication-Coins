(w=>{
	const onceAt=(e,s,c)=>{
		const f=o=>{e.removeEventListener(s,f);c(o)};
		e.addEventListener(s,f)
	},
	debounced=(f,i=300)=>{
		const a=setTimeout,b=clearTimeout;
		let e;
		return x=>{b(e);e=a(()=>{f(x)},i)}
	},
	routes={},
	router=()=>{
		const l=w.location,args={query:l.search},o=routes;
		let p=l.hash,n=null;
		if(p.length){
			p=args.id=w.decodeURIComponent(p.slice(1));
			if(p in o ?('function'===typeof o[p]?false:(n=500,true)):(n=404,true)){
				n={code:n};
				p='bad'
			}
		}else{
			p=args.id='home'
		};
		args.error=n;
		o[p](args)
	};
	onceAt(w,'load',()=>{
		let haveDataToSave=false,isRefreshing=false;
		const d=w.document,
		$body=d.body,
		$h1=d.getElementById('h1'),
		AppName=d.title='CoinsApp';
		$article=d.getElementById('article'),
		$bad=$article.querySelector('#bad'),
		$bad_H2=$bad.appendChild(d.createElement('h2')),	
		$coin_INPUT=$article.querySelector('#coin-input'),
		$coin_BUTTON=$article.querySelector('#coin-button'),
		$coins_DL=$article.querySelector('#coins-datalist'),
		$coins_UL=$article.querySelector('#coins-ul'),
		coinChoosedOptions=[],
		errorMsg={
			0:($bad_H2.innerText='Sorry, there was an error.'),
			404:'Not found.',
			500:'Internal error.'
		},
		removeSectionCurrentClass=e=>{
			$article.querySelectorAll('section.current').forEach(e=>{e.classList.remove('current')});
		},
		removeAttrs=(e,a)=>{
			a.forEach(s=>{e.removeAttribute(s)})
		},
		removeClassAndRemoveEmptyAttribute=(e,s)=>{
			e.classList.remove(s);
			if(''===e.className){
				e.removeAttribute('class')
			}
		},
		goHome=()=>{
			w.location.hash='home'
		},
		pick=(id,isHome=false)=>{
			removeSectionCurrentClass();
			let e=$h1;
			e.onclick=isHome?(
				removeAttrs(e,['class','title']),
				null
			):(
				e.setAttribute('title','Back to \u2302 Homepage'),
				e.className='go-home',
				goHome
			);
			const s='#'+id,t=d.title=AppName+s;
			onceAt(w,'beforeunload',event=>{
				const w=event.currentTarget,l=w.location;
				w.history.pushState(null,t,l.pathname+l.search+s);
			});
			(e=$article.querySelector(s)).classList.add('current');
			return e
		},

		handleAnimatioFadeInEnd=event=>{
			if('fadein'===event.animationName){
				const e=event.target;
				e.removeEventListener('animationend',handleAnimatioFadeInEnd);
				removeClassAndRemoveEmptyAttribute(e,'refreshing');
				isRefreshing=false
			}
		};

		routes['home']=args=>{
			pick(args.id,true);
		};

		routes['select-coin']=args=>{
			pick(args.id);
		};

		routes['detail']=args=>{
			pick(args.id);
		};

		routes['bad']=args=>{
			removeSectionCurrentClass();
			const o=errorMsg,p=args.error.code;
			$bad.className='current\u0020error-'+p;
			$bad_H2.innerHTML=o[p in o?p:0]
		};


		onceAt($coin_INPUT,'change',()=>{
			haveDataToSave=true
		});

		$coin_INPUT.addEventListener('change',event=>{
			console.log('change',event);
			const list=$coins_DL,e=$coin_INPUT,v=e.value;
			e.datasource=null;
			e.blur();
			for(const option of list.getElementsByTagName('option')){
				if(true!==option.disabled && v===option.textContent){
					list.querySelectorAll('option.selected').forEach(e=>{
						removeClassAndRemoveEmptyAttribute(e,'selected')
					});
					option.classList.add('selected');
					e.datasource=option;
					const o=e.classList;
					o.add('usable');
					onceAt(e,'input',()=>{
						o.remove('usable');
					});
					break
				}
			};
		});

/**/
		$coin_INPUT.addEventListener('keyup',debounced(event=>{
			const e=$coin_INPUT,o=e.classList,v=e.value,s='fetching-data';
			e.blur();
			e.click();
			o.add(s);
			setTimeout(()=>{
				o.remove(s);
				if($coins_DL.querySelectorAll('option[value="'+v+'"]').length){

					o.add('usable');
				}
			},Math.floor(Math.random()*4E3));
		}));



		$coin_BUTTON.addEventListener('click',event=>{
			let e=$coin_INPUT;
			const v=e.value;
			e.datasource=null;
			field.value='';
			if(e=e.datasource){
				e.disabled=true;
				coinChoosedOptions.push(e);
				const li=d.createElement('li');
				li.datasource=e;
				li.appendChild(d.createTextNode(v));
				$coins_UL.appendChild(li);
				removeClassAndRemoveEmptyAttribute(e,'selected')
			}
		});


		w.addEventListener('beforeunload',event=>{
			let s=null;
			if(haveDataToSave){
				s=event.returnValue=true;//'Are you sure you want to leave?';
			};
			return s
		});

		w.addEventListener('popstate',	event=>{
			console.info('PopState:%O',event.state)
		});

		w.addEventListener('keydown',event=>{
			if(116===event.keyCode){
				let e=isRefreshing;
				if(e||(e=event.target,!e)||(e=e.nodeName.toLowerCase(),'input'!==e && 'textarea'!==e)){
					e=event;
					e.preventDefault();
					e.stopPropagation();
					if(true!==isRefreshing){
						isRefreshing=true;
						e=$body;
						const o=e.classList,s='refreshing';
						e.addEventListener('animationend',handleAnimatioFadeInEnd);
						o.remove(s);
						o.add(s)
					}
				};
				return false
			}
		});

		w.addEventListener('hashchange',router);
		router();
	})
})(window);




/*

		



			onceAt($coin_INPUT,'mouseout',()=>{
				$coin_INPUT.blur()
			});


		$coins_DL.addEventListener('input',event=>{
			console.warn(event)
		});


$coins_DLSelect=$coins_DL.getElementsByTagName('select')[0],

:selected

 
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });
			//event.preventDefault();
			//event.stopPropagation();
		  // Chrome requires returnValue to be set
		 //event.returnValue = null;

,
		saveData=()=>{
		  let promise = new Promise((resolve, reject) => {
			setTimeout(() => resolve("done!, dati salvati"), 2000)
		  });
			return promise
		}


//console.log('route:',s);
console.warn('bad route!')

			w.history.pushState(null,null,w.location.pathname+'#home');
const d=w.document,bodyMain=d.getElementById('body_main');
if(bodyMain){}

.split('/').slice(0, 2).join('/')
const params = new URLSearchParams(window.location.search);  
const name = params.get("name");  

params=new w.URLSearchParams(w.location.search);

const console=w.console,

			header=d.getElementById('body_header'),
			footer=d.getElementById('body_footer');

e.querySelector('H2');

w.Array(3).fill(null),
const w=event.currentTarget;
rconst {getNavRoute}=eturn {
		getNavRoute:getNavRoute
	}
console.dir(getNavRoute());


			for(const e of $article.children){
				
			};
*/

