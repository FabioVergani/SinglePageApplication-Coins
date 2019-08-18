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
		let haveData=false,isRefreshing=false;
		const d=w.document,
		$body=d.body,
		$h1=d.getElementById('h1'),
		AppName=d.title='CoinsApp';
		$article=d.getElementById('article'),
		$coinField=$article.querySelector('#coin_field'),
		$coinList=$article.querySelector('#coin_list'),
		$coinAdd=$article.querySelector('#coin_add'),
		$coinsChoosed=$article.querySelector('#coins_choosed'),
		$bad=$article.querySelector('#bad'),
		$badh2=$bad.appendChild(d.createElement('h2')),
		errorMsg={
			0:($badh2.innerText='Sorry, there was an error.'),
			404:'Not found.',
			500:'Internal error.'
		},
		removeSectionCurrentClass=e=>{
			$article.querySelectorAll('section.current').forEach(e=>{e.classList.remove('current')});
		},
		removeAttrs=(e,a)=>{
			a.forEach(s=>{e.removeAttribute(s)})
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
				e.classList.remove('refreshing');
				if(''===e.className){
					e.removeAttribute('class')
				};
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
			$badh2.innerHTML=o[p in o?p:0];
			$bad.className='current\u0020error-'+p;
		};


		onceAt($coinField,'change',()=>{
			haveData=true
		});

		$coinField.addEventListener('change',event=>{
			console.log('change',event);
			const list=$coinList,field=$coinField,v=field.value;
			field.datasource=null;
			field.blur();
			for(const option of list.getElementsByTagName('option')){
				if(true!==option.disabled && v===option.textContent){
					list.querySelectorAll('option.selected').forEach(e=>{
						e.classList.remove('selected');
						if(''===e.className){
							e.removeAttribute('class')
						}
					});
					option.classList.add('selected');
					field.datasource=option;
					field.classList.add('usable');
					onceAt(field,'input',()=>{
						field.classList.remove('usable');
					});
					break
				}
			};
		});


		$coinField.addEventListener('keyup',debounced(event=>{
			const field=$coinField,v=field.value;
			
		}));


		$coinAdd.addEventListener('click',event=>{
			const field=$coinField,v=field.value,option=field.datasource;
			field.datasource=null;
			field.value='';
			if(option){
				option.disabled=true;
				const li=d.createElement('li');
				li.datasource=option;
				li.appendChild(d.createTextNode(v));
				$coinsChoosed.appendChild(li)
			}
		});


		w.addEventListener('beforeunload',event=>{
			let s=null;
			if(haveData){
				s=event.returnValue=true;//'Are you sure you want to leave?';
			};
			return s
		});

		w.addEventListener('popstate',	event=>{
			console.info('PopState:%O',event.state)
		});

		w.addEventListener('keydown',	event=>{
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

		



			onceAt($coinField,'mouseout',()=>{
				$coinField.blur()
			});


		$coinList.addEventListener('input',event=>{
			console.warn(event)
		});


$coinListSelect=$coinList.getElementsByTagName('select')[0],

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

