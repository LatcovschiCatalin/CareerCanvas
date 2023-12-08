"use strict";(self.webpackChunkbooks_shop=self.webpackChunkbooks_shop||[]).push([[788],{9798:(f,l,r)=>{r.d(l,{E:()=>m});var p=r(4004),i=r(1571),t=r(6491);let m=(()=>{class s{constructor(a,d){this.router=a,this.activatedRoute=d,this.observables=[]}getParamSubs(a){return this.activatedRoute.queryParams.pipe((0,p.U)(d=>d[a]))}getParamValue(a){return this.activatedRoute.snapshot.queryParamMap.get(a)}updateParams(a){this.router.navigate([],{relativeTo:this.activatedRoute,queryParams:a,queryParamsHandling:"merge"}).catch(console.error)}updateParam(a,d){this.router.navigate([],{relativeTo:this.activatedRoute,queryParams:{[a]:d},queryParamsHandling:"merge"}).catch(console.error)}deleteParam(a){return this.router.navigate([],{relativeTo:this.activatedRoute,queryParams:{[a]:null},queryParamsHandling:"merge"})}deleteParams(a){return this.router.navigate([],{relativeTo:this.activatedRoute,queryParams:a,queryParamsHandling:"merge"})}clear(){this.router.navigate([],{relativeTo:this.activatedRoute,replaceUrl:!0,queryParams:{}}).catch(console.error)}ngOnDestroy(){this.observables.forEach(a=>{a.unsubscribe()})}}return s.\u0275fac=function(a){return new(a||s)(i.LFG(t.F0),i.LFG(t.gz))},s.\u0275prov=i.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()},9788:(f,l,r)=>{r.r(l),r.d(l,{UsersModule:()=>A});var p=r(6895),i=r(6491),t=r(1571),m=r(4016),s=r(5856),u=r(5657);let a=(()=>{class e{constructor(o,c,g){this.authService=o,this.usersService=c,this.cookieService=g,this.selected="dark",this.data={title:"Users list"},this.user={first_name:"",last_name:""}}ngOnInit(){this.usersService.userInfo().subscribe(o=>{this.user=o})}logOut(){if(window.confirm("Are you sure you want to log out?"))return this.authService.logout()}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(m.e),t.Y36(s.f),t.Y36(u.N))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-navbar"]],decls:7,vars:1,consts:[[1,"nav"],[1,"left-side"],["src","data:image/png;base64,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","alt","book"],[1,"title"],[1,"log-out",3,"click"]],template:function(o,c){1&o&&(t.TgZ(0,"nav",0)(1,"div",1),t._UZ(2,"img",2),t.qZA(),t.TgZ(3,"div",3),t._uU(4),t.qZA(),t.TgZ(5,"div",4),t.NdJ("click",function(){return c.logOut()}),t._uU(6,"Log out"),t.qZA()()),2&o&&(t.xp6(4),t.Oqu(c.user.first_name+" "+c.user.last_name))},styles:[":root{--primary-bg: #151a30;--secondary-bg: #222b45;--text: #fff;--shadow: #1a1f33;--select: #151a30;--odd: #192038;--input-bg: rgba(255, 255, 255, .3) }button{background:transparent;border:none}.button{cursor:pointer;border:1px solid var(--text);padding:12px;border-radius:10px;font-size:21px;color:var(--text);margin:0 10px}.nav{width:100%;color:var(--text);position:fixed;box-shadow:0 .5rem 1rem 0 var(--shadow);padding:2.5rem 1.5rem;background-color:var(--secondary-bg);z-index:124;display:flex;max-height:80px;height:80px;justify-content:space-between;align-items:center}.nav .left-side{display:flex;justify-content:space-between;align-items:center}.nav .left-side img{width:50px;border-radius:50%;margin-right:15px}.nav .left-side .title{font-size:27px!important}.mat-form-field-appearance-legacy .mat-form-field-underline{display:none;color:var(--text)}.mat-form-field-appearance-legacy .mat-form-field-infix{padding:12px!important}.mat-form-field-appearance-legacy:hover{background:var(--primary-bg)!important}.mat-form-field-wrapper{padding:0!important}.mat-form-field-appearance-legacy .mat-form-field-infix{min-width:60px!important;width:-moz-fit-content;width:fit-content;border:1px solid #36f;border-radius:5px}.mat-select-panel:not([class*=mat-elevation-z]){background:var(--primary-bg)!important}.mat-option-text,.mat-select-arrow,.select-label{color:var(--text)!important}.mat-select-value{color:var(--text)}.log-out{cursor:pointer;border:1px solid #36f;padding:12px;border-radius:10px;font-size:18px;color:var(--text);margin:0 10px}\n"],encapsulation:2}),e})(),d=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-footer"]],decls:5,vars:0,consts:[[1,"footer"],[1,"message"]],template:function(o,c){1&o&&(t.TgZ(0,"footer",0)(1,"div",1),t._uU(2," Developed with love by "),t.TgZ(3,"b"),t._uU(4,"Team 16"),t.qZA()()())},styles:["[_ngcontent-%COMP%]:root{--primary-bg: #151a30;--secondary-bg: #222b45;--text: #fff;--shadow: #1a1f33;--select: #151a30;--odd: #192038;--input-bg: rgba(255, 255, 255, .3) }button[_ngcontent-%COMP%]{background:transparent;border:none}.button[_ngcontent-%COMP%]{cursor:pointer;border:1px solid var(--text);padding:12px;border-radius:10px;font-size:21px;color:var(--text);margin:0 10px}.footer[_ngcontent-%COMP%]{background-color:var(--secondary-bg);border-top:1px solid var(--primary-bg);color:var(--text);font-size:18px;text-align:center;width:100%;height:80px;font-weight:400;line-height:1.25rem;padding:2.5rem 1.5rem;position:absolute;left:0;bottom:0;display:flex;justify-content:center;align-items:center}.footer[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{font-size:21px;text-align:center}"]}),e})();const h=[{path:"",component:(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-user"]],decls:5,vars:0,consts:[[1,"container"],[1,"content"]],template:function(o,c){1&o&&(t.TgZ(0,"div",0),t._UZ(1,"app-navbar"),t.TgZ(2,"div",1),t._UZ(3,"router-outlet"),t.qZA(),t._UZ(4,"app-footer"),t.qZA())},dependencies:[i.lC,a,d],styles:["[_ngcontent-%COMP%]:root{--primary-bg: #151a30;--secondary-bg: #222b45;--text: #fff;--shadow: #1a1f33;--select: #151a30;--odd: #192038;--input-bg: rgba(255, 255, 255, .3) }button[_ngcontent-%COMP%]{background:transparent;border:none}.button[_ngcontent-%COMP%]{cursor:pointer;border:1px solid var(--text);padding:12px;border-radius:10px;font-size:21px;color:var(--text);margin:0 10px}.container[_ngcontent-%COMP%]{background:var(--primary-bg);width:100%;height:100vh}.content[_ngcontent-%COMP%]{background:var(--secondary-bg);padding:1.5rem;border-radius:10px;width:calc(100% - 3rem);max-height:calc(100vh - 160px - 3rem);height:100vh;overflow:scroll;margin-left:1.5rem;margin-right:1.5rem;position:absolute;margin-top:104px}"]}),e})(),children:[{path:"",loadChildren:()=>Promise.all([r.e(974),r.e(592),r.e(760)]).then(r.bind(r,760)).then(e=>e.TableModule)},{path:"details/:id",loadChildren:()=>r.e(592).then(r.bind(r,113)).then(e=>e.ViewDetailsModule)},{path:"offers/:id",loadChildren:()=>r.e(592).then(r.bind(r,8227)).then(e=>e.OffertsModule)}]}];let v=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[i.Bz.forChild(h),i.Bz]}),e})();var x=r(4385),y=r(433),C=r(9798);let b=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[C.E],imports:[p.ez]}),e})();var P=r(529),R=r(4396);let A=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[u.N,s.f,R.e],imports:[p.ez,P.JF,v,x.LD,y.u5,b]}),e})()}}]);