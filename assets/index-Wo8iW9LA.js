const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./controls-BGBHp22g.js","./jsxRuntime-Cc5QN6OA.js","./controls-C_nmwInl.css","./touch-DHeWgDA1.js","./touch-D-OwPndI.css","./debug-Io0mIPfZ.js","./debug-CSvHd5uI.css"])))=>i.map(i=>d[i]);
var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=1e3,n=1001,r=1002,i=1003,a=1004,o=1005,s=1006,c=1007,l=1008,u=1009,d=1010,f=1011,p=1012,m=1013,h=1014,g=1015,_=1016,v=1017,y=1018,b=1020,x=35902,S=35899,C=1021,w=1022,T=1023,E=1026,D=1027,O=1028,ee=1029,k=1030,te=1031,ne=1033,A=33776,j=33777,M=33778,N=33779,re=35840,P=35841,ie=35842,ae=35843,oe=36196,se=37492,ce=37496,F=37488,I=37489,le=37490,ue=37491,de=37808,fe=37809,pe=37810,me=37811,he=37812,ge=37813,_e=37814,ve=37815,ye=37816,be=37817,xe=37818,Se=37819,Ce=37820,we=37821,Te=36492,Ee=36494,De=36495,Oe=36283,ke=36284,Ae=36285,je=36286,L=2300,Me=2301,Ne=2302,Pe=2303,R=2400,Fe=2401,z=2402,Ie=3200,Le=`srgb`,Re=`srgb-linear`,ze=`linear`,Be=`srgb`,Ve=7680,He=35044,Ue=2e3;function We(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ge(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ke(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function qe(){let e=Ke(`canvas`);return e.style.display=`block`,e}var Je={};function Ye(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Xe(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function B(...e){e=Xe(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function V(...e){e=Xe(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Ze(...e){let t=e.join(` `);t in Je||(Je[t]=!0,B(...e))}function Qe(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var $e={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},et=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},tt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),nt=Math.PI/180,rt=180/Math.PI;function it(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(tt[e&255]+tt[e>>8&255]+tt[e>>16&255]+tt[e>>24&255]+`-`+tt[t&255]+tt[t>>8&255]+`-`+tt[t>>16&15|64]+tt[t>>24&255]+`-`+tt[n&63|128]+tt[n>>8&255]+`-`+tt[n>>16&255]+tt[n>>24&255]+tt[r&255]+tt[r>>8&255]+tt[r>>16&255]+tt[r>>24&255]).toLowerCase()}function H(e,t,n){return Math.max(t,Math.min(n,e))}function at(e,t){return(e%t+t)%t}function ot(e,t,n){return(1-n)*e+n*t}function st(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function ct(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var U=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(H(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},lt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:B(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(H(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this.z=H(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this.z=H(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ut.copy(this).projectOnVector(e),this.sub(ut)}reflect(e){return this.sub(ut.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(H(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ut=new W,dt=new lt,G=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Ze(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(ft.makeScale(e,t)),this}rotate(e){return Ze(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(ft.makeRotation(-e)),this}translate(e,t){return Ze(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(ft.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ft=new G,pt=new G().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),mt=new G().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ht(){let e={enabled:!0,workingColorSpace:Re,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=_t(e.r),e.g=_t(e.g),e.b=_t(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=vt(e.r),e.g=vt(e.g),e.b=vt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?ze:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ze(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ze(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Re]:{primaries:t,whitePoint:r,transfer:ze,toXYZ:pt,fromXYZ:mt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:t,whitePoint:r,transfer:Be,toXYZ:pt,fromXYZ:mt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}}),e}var gt=ht();function _t(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function vt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var yt,bt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{yt===void 0&&(yt=Ke(`canvas`)),yt.width=e.width,yt.height=e.height;let t=yt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=yt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ke(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=_t(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(_t(t[e]/255)*255):t[e]=_t(t[e]);return{data:t,width:e.width,height:e.height}}return B(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},xt=0,St=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:xt++}),this.uuid=it(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Ct(r[t].image)):e.push(Ct(r[t]))}else e=Ct(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Ct(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?bt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(B(`Texture: Unable to serialize Texture.`),{})}var wt=0,Tt=new W,Et=class e extends et{constructor(t=e.DEFAULT_IMAGE,r=e.DEFAULT_MAPPING,i=n,a=n,o=s,c=l,d=T,f=u,p=e.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wt++}),this.uuid=it(),this.name=``,this.source=new St(t),this.mipmaps=[],this.mapping=r,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=o,this.minFilter=c,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new U(0,0),this.repeat=new U(1,1),this.center=new U(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new G,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Tt).x}get height(){return this.source.getSize(Tt).y}get depth(){return this.source.getSize(Tt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){B(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){B(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case t:e.x-=Math.floor(e.x);break;case n:e.x=e.x<0?0:1;break;case r:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case t:e.y-=Math.floor(e.y);break;case n:e.y=e.y<0?0:1;break;case r:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Et.DEFAULT_IMAGE=null,Et.DEFAULT_MAPPING=300,Et.DEFAULT_ANISOTROPY=1;var Dt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=H(this.x,e.x,t.x),this.y=H(this.y,e.y,t.y),this.z=H(this.z,e.z,t.z),this.w=H(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=H(this.x,e,t),this.y=H(this.y,e,t),this.z=H(this.z,e,t),this.w=H(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(H(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ot=class extends et{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:s,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t),this.textures=[];let r=new Et({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:s,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new St(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},kt=class extends Ot{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},At=class extends Et{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=i,this.minFilter=i,this.wrapR=n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},jt=class extends Et{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=i,this.minFilter=i,this.wrapR=n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},K=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Mt.setFromMatrixColumn(e,0).length(),i=1/Mt.setFromMatrixColumn(e,1).length(),a=1/Mt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Pt,e,Ft)}lookAt(e,t,n){let r=this.elements;return Rt.subVectors(e,t),Rt.lengthSq()===0&&(Rt.z=1),Rt.normalize(),It.crossVectors(n,Rt),It.lengthSq()===0&&(Math.abs(n.z)===1?Rt.x+=1e-4:Rt.z+=1e-4,Rt.normalize(),It.crossVectors(n,Rt)),It.normalize(),Lt.crossVectors(Rt,It),r[0]=It.x,r[4]=Lt.x,r[8]=Rt.x,r[1]=It.y,r[5]=Lt.y,r[9]=Rt.y,r[2]=It.z,r[6]=Lt.z,r[10]=Rt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],ee=r[2],k=r[6],te=r[10],ne=r[14],A=r[3],j=r[7],M=r[11],N=r[15];return i[0]=a*x+o*T+s*ee+c*A,i[4]=a*S+o*E+s*k+c*j,i[8]=a*C+o*D+s*te+c*M,i[12]=a*w+o*O+s*ne+c*N,i[1]=l*x+u*T+d*ee+f*A,i[5]=l*S+u*E+d*k+f*j,i[9]=l*C+u*D+d*te+f*M,i[13]=l*w+u*O+d*ne+f*N,i[2]=p*x+m*T+h*ee+g*A,i[6]=p*S+m*E+h*k+g*j,i[10]=p*C+m*D+h*te+g*M,i[14]=p*w+m*O+h*ne+g*N,i[3]=_*x+v*T+y*ee+b*A,i[7]=_*S+v*E+y*k+b*j,i[11]=_*C+v*D+y*te+b*M,i[15]=_*w+v*O+y*ne+b*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,ee=_*O-v*D+y*E+b*T-x*w+S*C;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/ee;return e[0]=(o*O-s*D+c*E)*k,e[1]=(r*D-n*O-i*E)*k,e[2]=(m*S-h*x+g*b)*k,e[3]=(d*x-u*S-f*b)*k,e[4]=(s*T-a*O-c*w)*k,e[5]=(t*O-r*T+i*w)*k,e[6]=(h*y-p*S-g*v)*k,e[7]=(l*S-d*y+f*v)*k,e[8]=(a*D-o*T+c*C)*k,e[9]=(n*T-t*D-i*C)*k,e[10]=(p*x-m*y+g*_)*k,e[11]=(u*y-l*x-f*_)*k,e[12]=(o*w-a*E-s*C)*k,e[13]=(t*E-n*w+r*C)*k,e[14]=(m*v-p*b-h*_)*k,e[15]=(l*b-u*v+d*_)*k,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Mt.set(r[0],r[1],r[2]).length(),o=Mt.set(r[4],r[5],r[6]).length(),s=Mt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Nt.copy(this);let c=1/a,l=1/o,u=1/s;return Nt.elements[0]*=c,Nt.elements[1]*=c,Nt.elements[2]*=c,Nt.elements[4]*=l,Nt.elements[5]*=l,Nt.elements[6]*=l,Nt.elements[8]*=u,Nt.elements[9]*=u,Nt.elements[10]*=u,t.setFromRotationMatrix(Nt),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ue,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ue,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Mt=new W,Nt=new K,Pt=new W(0,0,0),Ft=new W(1,1,1),It=new W,Lt=new W,Rt=new W,zt=new K,Bt=new lt,Vt=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(H(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-H(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(H(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-H(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(H(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-H(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:B(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return zt.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zt,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bt.setFromEuler(this),this.setFromQuaternion(Bt,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Vt.DEFAULT_ORDER=`XYZ`;var Ht=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Ut=0,Wt=new W,Gt=new lt,Kt=new K,qt=new W,Jt=new W,Yt=new W,Xt=new lt,Zt=new W(1,0,0),Qt=new W(0,1,0),$t=new W(0,0,1),en={type:`added`},tn={type:`removed`},nn={type:`childadded`,child:null},rn={type:`childremoved`,child:null},an=class e extends et{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ut++}),this.uuid=it(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new W,n=new Vt,r=new lt,i=new W(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new K},normalMatrix:{value:new G}}),this.matrix=new K,this.matrixWorld=new K,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ht,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gt.setFromAxisAngle(e,t),this.quaternion.multiply(Gt),this}rotateOnWorldAxis(e,t){return Gt.setFromAxisAngle(e,t),this.quaternion.premultiply(Gt),this}rotateX(e){return this.rotateOnAxis(Zt,e)}rotateY(e){return this.rotateOnAxis(Qt,e)}rotateZ(e){return this.rotateOnAxis($t,e)}translateOnAxis(e,t){return Wt.copy(e).applyQuaternion(this.quaternion),this.position.add(Wt.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zt,e)}translateY(e){return this.translateOnAxis(Qt,e)}translateZ(e){return this.translateOnAxis($t,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?qt.copy(e):qt.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Jt.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kt.lookAt(Jt,qt,this.up):Kt.lookAt(qt,Jt,this.up),this.quaternion.setFromRotationMatrix(Kt),r&&(Kt.extractRotation(r.matrixWorld),Gt.setFromRotationMatrix(Kt),this.quaternion.premultiply(Gt.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(V(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(en),nn.child=e,this.dispatchEvent(nn),nn.child=null):V(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(tn),rn.child=e,this.dispatchEvent(rn),rn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(en),nn.child=e,this.dispatchEvent(nn),nn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jt,e,Yt),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jt,Xt,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};an.DEFAULT_UP=new W(0,1,0),an.DEFAULT_MATRIX_AUTO_UPDATE=!0,an.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var on=class extends an{constructor(){super(),this.isGroup=!0,this.type=`Group`}},sn={type:`move`},cn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new on,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new on,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new on,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(sn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new on;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},ln={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},un={h:0,s:0,l:0},dn={h:0,s:0,l:0};function fn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var q=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Le){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=gt.workingColorSpace){return this.r=e,this.g=t,this.b=n,gt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=gt.workingColorSpace){if(e=at(e,1),t=H(t,0,1),n=H(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=fn(i,r,e+1/3),this.g=fn(i,r,e),this.b=fn(i,r,e-1/3)}return gt.colorSpaceToWorking(this,r),this}setStyle(e,t=Le){function n(t){t!==void 0&&parseFloat(t)<1&&B(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:B(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);B(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Le){let n=ln[e.toLowerCase()];return n===void 0?B(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_t(e.r),this.g=_t(e.g),this.b=_t(e.b),this}copyLinearToSRGB(e){return this.r=vt(e.r),this.g=vt(e.g),this.b=vt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Le){return gt.workingToColorSpace(pn.copy(this),e),Math.round(H(pn.r*255,0,255))*65536+Math.round(H(pn.g*255,0,255))*256+Math.round(H(pn.b*255,0,255))}getHexString(e=Le){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.workingToColorSpace(pn.copy(this),t);let n=pn.r,r=pn.g,i=pn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=gt.workingColorSpace){return gt.workingToColorSpace(pn.copy(this),t),e.r=pn.r,e.g=pn.g,e.b=pn.b,e}getStyle(e=Le){gt.workingToColorSpace(pn.copy(this),e);let t=pn.r,n=pn.g,r=pn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(un),this.setHSL(un.h+e,un.s+t,un.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(un),e.getHSL(dn);let n=ot(un.h,dn.h,t),r=ot(un.s,dn.s,t),i=ot(un.l,dn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},pn=new q;q.NAMES=ln;var mn=class extends an{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vt,this.environmentIntensity=1,this.environmentRotation=new Vt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},hn=new W,gn=new W,_n=new W,vn=new W,yn=new W,bn=new W,xn=new W,Sn=new W,Cn=new W,wn=new W,Tn=new Dt,En=new Dt,Dn=new Dt,On=class e{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),hn.subVectors(e,t),r.cross(hn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){hn.subVectors(r,t),gn.subVectors(n,t),_n.subVectors(e,t);let a=hn.dot(hn),o=hn.dot(gn),s=hn.dot(_n),c=gn.dot(gn),l=gn.dot(_n),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,vn)!==null&&vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,vn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,vn.x),s.addScaledVector(a,vn.y),s.addScaledVector(o,vn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Tn.setScalar(0),En.setScalar(0),Dn.setScalar(0),Tn.fromBufferAttribute(e,t),En.fromBufferAttribute(e,n),Dn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Tn,i.x),a.addScaledVector(En,i.y),a.addScaledVector(Dn,i.z),a}static isFrontFacing(e,t,n,r){return hn.subVectors(n,t),gn.subVectors(e,t),hn.cross(gn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hn.subVectors(this.c,this.b),gn.subVectors(this.a,this.b),hn.cross(gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;yn.subVectors(r,n),bn.subVectors(i,n),Sn.subVectors(e,n);let s=yn.dot(Sn),c=bn.dot(Sn);if(s<=0&&c<=0)return t.copy(n);Cn.subVectors(e,r);let l=yn.dot(Cn),u=bn.dot(Cn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(yn,a);wn.subVectors(e,i);let f=yn.dot(wn),p=bn.dot(wn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(bn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return xn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(xn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(yn,a).addScaledVector(bn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},kn=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,jn):jn.fromBufferAttribute(r,t),jn.applyMatrix4(e.matrixWorld),this.expandByPoint(jn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Mn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Mn.copy(e.boundingBox)),Mn.applyMatrix4(e.matrixWorld),this.union(Mn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jn),jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zn),Bn.subVectors(this.max,zn),Nn.subVectors(e.a,zn),Pn.subVectors(e.b,zn),Fn.subVectors(e.c,zn),In.subVectors(Pn,Nn),Ln.subVectors(Fn,Pn),Rn.subVectors(Nn,Fn);let t=[0,-In.z,In.y,0,-Ln.z,Ln.y,0,-Rn.z,Rn.y,In.z,0,-In.x,Ln.z,0,-Ln.x,Rn.z,0,-Rn.x,-In.y,In.x,0,-Ln.y,Ln.x,0,-Rn.y,Rn.x,0];return!Un(t,Nn,Pn,Fn,Bn)||(t=[1,0,0,0,1,0,0,0,1],!Un(t,Nn,Pn,Fn,Bn))?!1:(Vn.crossVectors(In,Ln),t=[Vn.x,Vn.y,Vn.z],Un(t,Nn,Pn,Fn,Bn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(An),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},An=[new W,new W,new W,new W,new W,new W,new W,new W],jn=new W,Mn=new kn,Nn=new W,Pn=new W,Fn=new W,In=new W,Ln=new W,Rn=new W,zn=new W,Bn=new W,Vn=new W,Hn=new W;function Un(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Hn.fromArray(e,a);let o=i.x*Math.abs(Hn.x)+i.y*Math.abs(Hn.y)+i.z*Math.abs(Hn.z),s=t.dot(Hn),c=n.dot(Hn),l=r.dot(Hn);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Wn=new W,Gn=new U,Kn=0,qn=class extends et{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kn++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=He,this.updateRanges=[],this.gpuType=g,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.applyMatrix3(e),this.setXY(t,Gn.x,Gn.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Wn.fromBufferAttribute(this,t),Wn.applyMatrix3(e),this.setXYZ(t,Wn.x,Wn.y,Wn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Wn.fromBufferAttribute(this,t),Wn.applyMatrix4(e),this.setXYZ(t,Wn.x,Wn.y,Wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wn.fromBufferAttribute(this,t),Wn.applyNormalMatrix(e),this.setXYZ(t,Wn.x,Wn.y,Wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wn.fromBufferAttribute(this,t),Wn.transformDirection(e),this.setXYZ(t,Wn.x,Wn.y,Wn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=st(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=st(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=st(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=st(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=st(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),r=ct(r,this.array),i=ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Jn=class extends qn{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Yn=class extends qn{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Xn=class extends qn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Zn=new kn,Qn=new W,$n=new W,er=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Zn.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qn.subVectors(e,this.center);let t=Qn.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Qn,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($n.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qn.copy(e.center).add($n)),this.expandByPoint(Qn.copy(e.center).sub($n))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},tr=0,nr=new K,rr=new an,ir=new W,ar=new kn,or=new kn,sr=new W,cr=class e extends et{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tr++}),this.uuid=it(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(We(e)?Yn:Jn)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new G().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return nr.makeRotationFromQuaternion(e),this.applyMatrix4(nr),this}rotateX(e){return nr.makeRotationX(e),this.applyMatrix4(nr),this}rotateY(e){return nr.makeRotationY(e),this.applyMatrix4(nr),this}rotateZ(e){return nr.makeRotationZ(e),this.applyMatrix4(nr),this}translate(e,t,n){return nr.makeTranslation(e,t,n),this.applyMatrix4(nr),this}scale(e,t,n){return nr.makeScale(e,t,n),this.applyMatrix4(nr),this}lookAt(e){return rr.lookAt(e),rr.updateMatrix(),this.applyMatrix4(rr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ir).negate(),this.translate(ir.x,ir.y,ir.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Xn(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&B(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){V(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];ar.setFromBufferAttribute(n),this.morphTargetsRelative?(sr.addVectors(this.boundingBox.min,ar.min),this.boundingBox.expandByPoint(sr),sr.addVectors(this.boundingBox.max,ar.max),this.boundingBox.expandByPoint(sr)):(this.boundingBox.expandByPoint(ar.min),this.boundingBox.expandByPoint(ar.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&V(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new er);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){V(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new W,1/0);return}if(e){let n=this.boundingSphere.center;if(ar.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];or.setFromBufferAttribute(n),this.morphTargetsRelative?(sr.addVectors(ar.min,or.min),ar.expandByPoint(sr),sr.addVectors(ar.max,or.max),ar.expandByPoint(sr)):(ar.expandByPoint(or.min),ar.expandByPoint(or.max))}ar.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)sr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(sr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)sr.fromBufferAttribute(a,t),o&&(ir.fromBufferAttribute(e,t),sr.add(ir)),r=Math.max(r,n.distanceToSquared(sr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&V(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){V(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new qn(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new W,s[e]=new W;let c=new W,l=new W,u=new W,d=new U,f=new U,p=new U,m=new W,h=new W;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new W,y=new W,b=new W,x=new W;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new qn(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new W,i=new W,a=new W,o=new W,s=new W,c=new W,l=new W,u=new W;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)sr.fromBufferAttribute(e,t),sr.normalize(),e.setXYZ(t,sr.x,sr.y,sr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new qn(a,r,i)}if(this.index===null)return B(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},lr=new W,ur=new W,dr=new G,fr=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=lr.subVectors(n,t).cross(ur.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(lr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||dr.getNormalMatrix(e),r=this.coplanarPoint(lr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},pr=0,mr=class extends et{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pr++}),this.uuid=it(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new q(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ve,this.stencilZFail=Ve,this.stencilZPass=Ve,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){B(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){B(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new q().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new fr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new U().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new U().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},hr=new W,gr=new W,_r=new W,vr=new W,yr=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=hr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hr.copy(this.origin).addScaledVector(this.direction,t),hr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){gr.copy(e).add(t).multiplyScalar(.5),_r.copy(t).sub(e).normalize(),vr.copy(this.origin).sub(gr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(_r),o=vr.dot(this.direction),s=-vr.dot(_r),c=vr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(gr).addScaledVector(_r,d),f}intersectSphere(e,t){if(e.radius<0)return null;hr.subVectors(e.center,this.origin);let n=hr.dot(this.direction),r=hr.dot(hr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,hr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,ee,k,te,ne,A;if(y>=b&&y>=x?(w=s,D=u,k=p,A=g,s>=0?(S=c,C=l,T=d,E=f,O=m,ee=h,te=_,ne=v):(S=l,C=c,T=f,E=d,O=h,ee=m,te=v,ne=_)):b>=x?(w=c,D=d,k=m,A=_,c>=0?(S=l,C=s,T=f,E=u,O=h,ee=p,te=v,ne=g):(S=s,C=l,T=u,E=f,O=p,ee=h,te=g,ne=v)):(w=l,D=f,k=h,A=v,l>=0?(S=s,C=c,T=u,E=d,O=p,ee=m,te=g,ne=_):(S=c,C=s,T=d,E=u,O=m,ee=p,te=_,ne=g)),w===0)return null;let j=S/w,M=C/w,N=1/w,re=T-j*D,P=E-M*D,ie=O-j*k,ae=ee-M*k,oe=te-j*A,se=ne-M*A,ce=oe*ae-se*ie,F=re*se-P*oe,I=ie*P-ae*re;if(r){if(ce<0||F<0||I<0)return null}else if((ce<0||F<0||I<0)&&(ce>0||F>0||I>0))return null;let le=ce+F+I;if(le===0)return null;let ue=N*(ce*D+F*k+I*A);return(le>0?ue<0:ue>0)?null:this.at(ue/le,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},br=class extends mr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vt,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},xr=new K,Sr=new yr,Cr=new er,wr=new W,Tr=new W,Er=new W,Dr=new W,Or=new W,kr=new W,Ar=new W,jr=new W,Mr=class extends an{constructor(e=new cr,t=new br){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){kr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Or.fromBufferAttribute(s,e),a?kr.addScaledVector(Or,r):kr.addScaledVector(Or.sub(t),r))}t.add(kr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(i),Sr.copy(e.ray).recast(e.near),!(Cr.containsPoint(Sr.origin)===!1&&(Sr.intersectSphere(Cr,wr)===null||Sr.origin.distanceToSquared(wr)>(e.far-e.near)**2))&&(xr.copy(i).invert(),Sr.copy(e.ray).applyMatrix4(xr),(n.boundingBox===null||Sr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Sr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Pr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Pr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Pr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Pr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Nr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;jr.copy(s),jr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(jr);return l<n.near||l>n.far?null:{distance:l,point:jr.clone(),object:e}}function Pr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Tr),e.getVertexPosition(c,Er),e.getVertexPosition(l,Dr);let u=Nr(e,t,n,r,Tr,Er,Dr,Ar);if(u){let e=new W;On.getBarycoord(Ar,Tr,Er,Dr,e),i&&(u.uv=On.getInterpolatedAttribute(i,s,c,l,e,new U)),a&&(u.uv1=On.getInterpolatedAttribute(a,s,c,l,e,new U)),o&&(u.normal=On.getInterpolatedAttribute(o,s,c,l,e,new W),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new W,materialIndex:0};On.getNormal(Tr,Er,Dr,t.normal),u.face=t,u.barycoord=e}return u}var Fr=class extends Et{constructor(e=null,t=1,n=1,r,a,o,s,c,l=i,u=i,d,f){super(null,o,s,c,l,u,r,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ir=class extends qn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Lr=new K,Rr=new K,zr=[],Br=new kn,Vr=new K,Hr=new Mr,Ur=new er,Wr=class extends Mr{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ir(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Vr)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new kn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Lr),Br.copy(e.boundingBox).applyMatrix4(Lr),this.boundingBox.union(Br)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new er),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Lr),Ur.copy(e.boundingSphere).applyMatrix4(Lr),this.boundingSphere.union(Ur)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Hr.geometry=this.geometry,Hr.material=this.material,Hr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ur.copy(this.boundingSphere),Ur.applyMatrix4(n),e.ray.intersectsSphere(Ur)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Lr),Rr.multiplyMatrices(n,Lr),Hr.matrixWorld=Rr,Hr.raycast(e,zr);for(let e=0,n=zr.length;e<n;e++){let n=zr[e];n.instanceId=i,n.object=this,t.push(n)}zr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ir(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Fr(new Float32Array(r*this.count),r,this.count,O,g));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Gr=new er,Kr=new U(.5,.5),qr=new W,Jr=class{constructor(e=new fr,t=new fr,n=new fr,r=new fr,i=new fr,a=new fr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ue,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Gr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Gr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Gr)}intersectsSprite(e){return Gr.center.set(0,0,0),Gr.radius=.7071067811865476+Kr.distanceTo(e.center),Gr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Gr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(qr.x=r.normal.x>0?e.max.x:e.min.x,qr.y=r.normal.y>0?e.max.y:e.min.y,qr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(qr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Yr=class extends mr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new q(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Xr=new W,Zr=new W,Qr=new K,$r=new yr,ei=new er,ti=new W,ni=new W,ri=class extends an{constructor(e=new cr,t=new Yr){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Xr.fromBufferAttribute(t,e-1),Zr.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Xr.distanceTo(Zr);e.setAttribute(`lineDistance`,new Xn(n,1))}else B(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ei.copy(n.boundingSphere),ei.applyMatrix4(r),ei.radius+=i,e.ray.intersectsSphere(ei)===!1)return;Qr.copy(r).invert(),$r.copy(e.ray).applyMatrix4(Qr);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=ii(this,e,$r,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=ii(this,e,$r,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=ii(this,e,$r,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=ii(this,e,$r,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ii(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Xr.fromBufferAttribute(s,i),Zr.fromBufferAttribute(s,a),n.distanceSqToSegment(Xr,Zr,ti,ni)>r)return;ti.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(ti);if(!(c<t.near||c>t.far))return{distance:c,point:ni.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var ai=new W,oi=new W,si=class extends ri{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)ai.fromBufferAttribute(t,e),oi.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+ai.distanceTo(oi);e.setAttribute(`lineDistance`,new Xn(n,1))}else B(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},ci=class extends mr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new q(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},li=new K,ui=new yr,di=new er,fi=new W,pi=class extends an{constructor(e=new cr,t=new ci){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),di.copy(n.boundingSphere),di.applyMatrix4(r),di.radius+=i,e.ray.intersectsSphere(di)===!1)return;li.copy(r).invert(),ui.copy(e.ray).applyMatrix4(li);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);fi.fromBufferAttribute(l,n),mi(fi,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)fi.fromBufferAttribute(l,a),mi(fi,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function mi(e,t,n,r,i,a,o){let s=ui.distanceSqToPoint(e);if(s<n){let n=new W;ui.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var hi=class extends Et{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},gi=class extends Et{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},_i=class extends Et{constructor(e,t,n=h,r,a,o,s=i,c=i,l,u=E,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new St(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},vi=class extends _i{constructor(e,t=h,n=301,r,a,o=i,s=i,c,l=E){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},yi=class extends Et{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},bi=class e extends cr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Xn(c,3)),this.setAttribute(`normal`,new Xn(l,3)),this.setAttribute(`uv`,new Xn(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new W;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},xi=class e extends cr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Xn(u,3)),this.setAttribute(`normal`,new Xn(d,3)),this.setAttribute(`uv`,new Xn(f,2));function _(){let a=new W,_=new W,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new U,m=new W,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Si=class e extends xi{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ci=class e extends cr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Xn(i,3)),this.setAttribute(`normal`,new Xn(i.slice(),3)),this.setAttribute(`uv`,new Xn(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new W,r=new W,i=new W;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new W;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new W;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new W,t=new W,n=new W,r=new W,o=new U,s=new U,c=new U;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},wi=class e extends Ci{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ti=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){B(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new U:new W);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new W,r=[],i=[],a=[],o=new W,s=new K;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new W)}i[0]=new W,a[0]=new W;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(H(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(H(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ei=class extends Ti{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new U){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Di=class extends Ei{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Oi(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var ki=new W,Ai=new W,ji=new Oi,Mi=new Oi,Ni=new Oi,Pi=class extends Ti{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new W){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Ai.subVectors(r[0],r[1]).add(r[0]),c=Ai);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(ki.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=ki),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),ji.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Mi.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Ni.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(ji.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Mi.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Ni.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(ji.calc(s),Mi.calc(s),Ni.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new W().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Fi(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Ii(e,t){let n=1-e;return n*n*t}function Li(e,t){return 2*(1-e)*e*t}function Ri(e,t){return e*e*t}function zi(e,t,n,r){return Ii(e,t)+Li(e,n)+Ri(e,r)}function Bi(e,t){let n=1-e;return n*n*n*t}function Vi(e,t){let n=1-e;return 3*n*n*e*t}function Hi(e,t){return 3*(1-e)*e*e*t}function Ui(e,t){return e*e*e*t}function Wi(e,t,n,r,i){return Bi(e,t)+Vi(e,n)+Hi(e,r)+Ui(e,i)}var Gi=class extends Ti{constructor(e=new U,t=new U,n=new U,r=new U){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Wi(e,r.x,i.x,a.x,o.x),Wi(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ki=class extends Ti{constructor(e=new W,t=new W,n=new W,r=new W){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Wi(e,r.x,i.x,a.x,o.x),Wi(e,r.y,i.y,a.y,o.y),Wi(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},qi=class extends Ti{constructor(e=new U,t=new U){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ji=class extends Ti{constructor(e=new W,t=new W){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new W){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new W){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Yi=class extends Ti{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(zi(e,r.x,i.x,a.x),zi(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xi=class extends Ti{constructor(e=new W,t=new W,n=new W){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(zi(e,r.x,i.x,a.x),zi(e,r.y,i.y,a.y),zi(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Zi=class extends Ti{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new U){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Fi(o,s.x,c.x,l.x,u.x),Fi(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this}},Qi=Object.freeze({__proto__:null,ArcCurve:Di,CatmullRomCurve3:Pi,CubicBezierCurve:Gi,CubicBezierCurve3:Ki,EllipseCurve:Ei,LineCurve:qi,LineCurve3:Ji,QuadraticBezierCurve:Yi,QuadraticBezierCurve3:Xi,SplineCurve:Zi}),$i=class extends Ti{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new Qi[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new Qi[n.type]().fromJSON(n))}return this}},ea=class extends $i{constructor(e){super(),this.type=`Path`,this.currentPoint=new U,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new qi(this.currentPoint.clone(),new U(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Yi(this.currentPoint.clone(),new U(e,t),new U(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new Gi(this.currentPoint.clone(),new U(e,t),new U(n,r),new U(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new Zi([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Ei(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},ta=class extends ea{constructor(e){super(e),this.uuid=it(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new ea().fromJSON(n))}return this}};function na(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=ra(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=ua(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return aa(a,o,n,s,c,l,0),o}function ra(e,t,n,r,i){let a;if(i===Pa(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=ja(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=ja(i/r|0,e[i],e[i+1],a);return a&&Ca(a,a.next)&&(Ma(a),a=a.next),a}function ia(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Ca(n,n.next)||Sa(n.prev,n,n.next)===0)){if(Ma(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function aa(e,t,n,r,i,a,o){if(!e)return;!o&&a&&ha(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?sa(e,r,i,a):oa(e)){t.push(c.i,e.i,l.i),Ma(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=ca(ia(e),t),aa(e,t,n,r,i,a,2)):o===2&&la(e,t,n,r,i,a):aa(ia(e),t,n,r,i,a,1);break}}}function oa(e){let t=e.prev,n=e,r=e.next;if(Sa(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&ba(i,s,a,c,o,l,m.x,m.y)&&Sa(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function sa(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Sa(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=_a(p,m,t,n,r),v=_a(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&ba(s,u,c,d,l,f,y.x,y.y)&&Sa(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&ba(s,u,c,d,l,f,b.x,b.y)&&Sa(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&ba(s,u,c,d,l,f,y.x,y.y)&&Sa(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&ba(s,u,c,d,l,f,b.x,b.y)&&Sa(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function ca(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Ca(r,i)&&wa(r,n,n.next,i)&&Oa(r,i)&&Oa(i,r)&&(t.push(r.i,n.i,i.i),Ma(n),Ma(n.next),n=e=i),n=n.next}while(n!==e);return ia(n)}function la(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&xa(o,e)){let s=Aa(o,e);o=ia(o,o.next),s=ia(s,s.next),aa(o,t,n,r,i,a,0),aa(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function ua(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=ra(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(va(o))}i.sort(da);for(let e=0;e<i.length;e++)n=fa(i[e],n);return n}function da(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function fa(e,t){let n=pa(e,t);if(!n)return t;let r=Aa(n,e);return ia(r,r.next),ia(n,n.next)}function pa(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Ca(e,n))return n;do{if(Ca(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&ya(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Oa(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&ma(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function ma(e,t){return Sa(e.prev,e,t.prev)<0&&Sa(t.next,e,e.next)<0}function ha(e,t,n,r){let i=e;do i.z===0&&(i.z=_a(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,ga(i)}function ga(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function _a(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function va(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function ya(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function ba(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&ya(e,t,n,r,i,a,o,s)}function xa(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Da(e,t)&&(Oa(e,t)&&Oa(t,e)&&ka(e,t)&&(Sa(e.prev,e,t.prev)||Sa(e,t.prev,t))||Ca(e,t)&&Sa(e.prev,e,e.next)>0&&Sa(t.prev,t,t.next)>0)}function Sa(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Ca(e,t){return e.x===t.x&&e.y===t.y}function wa(e,t,n,r){let i=Ea(Sa(e,t,n)),a=Ea(Sa(e,t,r)),o=Ea(Sa(n,r,e)),s=Ea(Sa(n,r,t));return!!(i!==a&&o!==s||i===0&&Ta(e,n,t)||a===0&&Ta(e,r,t)||o===0&&Ta(n,e,r)||s===0&&Ta(n,t,r))}function Ta(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Ea(e){return e>0?1:e<0?-1:0}function Da(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&wa(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Oa(e,t){return Sa(e.prev,e,e.next)<0?Sa(e,t,e.next)>=0&&Sa(e,e.prev,t)>=0:Sa(e,t,e.prev)<0||Sa(e,e.next,t)<0}function ka(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Aa(e,t){let n=Na(e.i,e.x,e.y),r=Na(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function ja(e,t,n,r){let i=Na(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Ma(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Na(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Pa(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Fa=class{static triangulate(e,t,n=2){return na(e,t,n)}},Ia=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];La(e),Ra(n,e);let a=e.length;t.forEach(La);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Ra(n,t[e]);let o=Fa.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function La(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Ra(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var za=class e extends cr{constructor(e=new ta([new U(.5,.5),new U(-.5,.5),new U(-.5,-.5),new U(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new Xn(r,3)),this.setAttribute(`uv`,new Xn(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Ba:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new W,b=new W,x=new W}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Ia.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Ia.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));if(s<=10000000000000001e-36*c*c){e.splice(r,1),n--;continue}t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||V(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let ee=C.length;function k(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new U(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new U(r/a,i/a)}let te=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),te[e]=k(D[e],D[n],D[r]);let ne=[],A,j=te.concat();for(let e=0,t=E;e<t;e++){let t=w[e];A=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),A[e]=k(t[e],t[r],t[i]);ne.push(A),j=j.concat(A)}let M;if(p===0)M=Ia.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],te[t],a);oe(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];A=ne[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],A[e],a);oe(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}M=Ia.triangulateShape(e,t)}let N=M.length,re=d+f;for(let e=0;e<ee;e++){let t=l?O(C[e],j[e],re):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),oe(x.x,x.y,x.z)):oe(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<ee;t++){let n=l?O(C[t],j[t],re):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),oe(x.x,x.y,x.z)):oe(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],te[e],r);oe(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];A=ne[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],A[e],r);_?oe(i.x,i.y+g[s-1].y,g[s-1].x+n):oe(i.x,i.y,c+n)}}}P(),ie();function P(){let e=r.length/3;if(l){let e=0,t=ee*e;for(let e=0;e<N;e++){let n=M[e];se(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=ee*e;for(let e=0;e<N;e++){let n=M[e];se(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<N;e++){let t=M[e];se(t[2],t[1],t[0])}for(let e=0;e<N;e++){let t=M[e];se(t[0]+ee*s,t[1]+ee*s,t[2]+ee*s)}}n.addGroup(e,r.length/3-e,0)}function ie(){let e=r.length/3,t=0;ae(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];ae(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function ae(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=ee*e,a=ee*(e+1);ce(t+r+n,t+i+n,t+i+a,t+r+a)}}}function oe(e,t,n){a.push(e),a.push(t),a.push(n)}function se(e,t,i){F(e),F(t),F(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);I(o[0]),I(o[1]),I(o[2])}function ce(e,t,i,a){F(e),F(t),F(a),F(t),F(i),F(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);I(s[0]),I(s[1]),I(s[3]),I(s[1]),I(s[2]),I(s[3])}function F(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function I(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Va(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Qi[i.type]().fromJSON(i)),new e(r,t.options)}},Ba={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new U(a,o),new U(s,c),new U(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new U(o,1-c),new U(l,1-d),new U(f,1-m),new U(h,1-_)]:[new U(s,1-c),new U(u,1-d),new U(p,1-m),new U(g,1-_)]}};function Va(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Ha=class e extends Ci{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ua=class e extends Ci{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Wa=class e extends cr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Xn(p,3)),this.setAttribute(`normal`,new Xn(m,3)),this.setAttribute(`uv`,new Xn(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Ga=class e extends cr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new W,p=new U;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Xn(s,3)),this.setAttribute(`normal`,new Xn(c,3)),this.setAttribute(`uv`,new Xn(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Ka=class e extends cr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new W,d=new W,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Xn(p,3)),this.setAttribute(`normal`,new Xn(m,3)),this.setAttribute(`uv`,new Xn(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},qa=class e extends Ci{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type=`TetrahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ja=class e extends cr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new W,f=new W,p=new W;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Xn(c,3)),this.setAttribute(`normal`,new Xn(l,3)),this.setAttribute(`uv`,new Xn(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},Ya=class extends cr{constructor(e=null){if(super(),this.type=`WireframeGeometry`,this.parameters={geometry:e},e!==null){let t=[],n=new Set,r=new W,i=new W;if(e.index!==null){let a=e.attributes.position,o=e.index,s=e.groups;s.length===0&&(s=[{start:0,count:o.count,materialIndex:0}]);for(let e=0,c=s.length;e<c;++e){let c=s[e],l=c.start,u=c.count;for(let e=l,s=l+u;e<s;e+=3)for(let s=0;s<3;s++){let c=o.getX(e+s),l=o.getX(e+(s+1)%3);r.fromBufferAttribute(a,c),i.fromBufferAttribute(a,l),Xa(r,i,n)===!0&&(t.push(r.x,r.y,r.z),t.push(i.x,i.y,i.z))}}}else{let a=e.attributes.position;for(let e=0,o=a.count/3;e<o;e++)for(let o=0;o<3;o++){let s=3*e+o,c=3*e+(o+1)%3;r.fromBufferAttribute(a,s),i.fromBufferAttribute(a,c),Xa(r,i,n)===!0&&(t.push(r.x,r.y,r.z),t.push(i.x,i.y,i.z))}}this.setAttribute(`position`,new Xn(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Xa(e,t,n){let r=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,i=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;return n.has(r)===!0||n.has(i)===!0?!1:(n.add(r),n.add(i),!0)}function Za(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if($a(i))i.isRenderTargetTexture?(B(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if($a(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Qa(e){let t={};for(let n=0;n<e.length;n++){let r=Za(e[n]);for(let e in r)t[e]=r[e]}return t}function $a(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function eo(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function to(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:gt.workingColorSpace}var no={clone:Za,merge:Qa},ro=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,io=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ao=class extends mr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ro,this.fragmentShader=io,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Za(e.uniforms),this.uniformsGroups=eo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new q().setHex(r.value);break;case`v2`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Dt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new K().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},oo=class extends ao{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},so=class extends mr{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:``},this.type=`MeshToonMaterial`,this.color=new q(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},co=class extends mr{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type=`MeshNormalMaterial`,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},lo=class extends mr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ie,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},uo=class extends mr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function fo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function po(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var mo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ho=class extends mo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:R,endingEnd:R}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Fe:i=e,o=2*t-n;break;case z:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Fe:a=e,s=2*n-t;break;case z:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},go=class extends mo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},_o=class extends mo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},vo=class extends mo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=xo(n,t,g,y,r);i[p]=yo(x,o,_,b,m)}return i}};function yo(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function bo(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function xo(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=yo(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=bo(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var So=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=fo(t,this.TimeBufferType),this.values=fo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:fo(e.times,Array),values:fo(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),po(e.settings)&&(n.settings={inTangents:fo(e.settings.inTangents,Array),outTangents:fo(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new _o(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new go(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ho(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new vo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case L:t=this.InterpolantFactoryMethodDiscrete;break;case Me:t=this.InterpolantFactoryMethodLinear;break;case Ne:t=this.InterpolantFactoryMethodSmooth;break;case Pe:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return B(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return L;case this.InterpolantFactoryMethodLinear:return Me;case this.InterpolantFactoryMethodSmooth:return Ne;case this.InterpolantFactoryMethodBezier:return Pe}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;po(this.settings)&&(Co(this.settings.inTangents,e),Co(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(V(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(V(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){V(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){V(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ge(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){V(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ne,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,po(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Co(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}So.prototype.ValueTypeName=``,So.prototype.TimeBufferType=Float32Array,So.prototype.ValueBufferType=Float32Array,So.prototype.DefaultInterpolation=Me;var wo=class extends So{constructor(e,t,n){super(e,t,n)}};wo.prototype.ValueTypeName=`bool`,wo.prototype.ValueBufferType=Array,wo.prototype.DefaultInterpolation=L,wo.prototype.InterpolantFactoryMethodLinear=void 0,wo.prototype.InterpolantFactoryMethodSmooth=void 0;var To=class extends So{constructor(e,t,n,r){super(e,t,n,r)}};To.prototype.ValueTypeName=`color`;var Eo=class extends So{constructor(e,t,n,r){super(e,t,n,r)}};Eo.prototype.ValueTypeName=`number`;var Do=class extends mo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)lt.slerpFlat(i,0,a,c-o,a,c,s);return i}},Oo=class extends So{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Do(this.times,this.values,this.getValueSize(),e)}};Oo.prototype.ValueTypeName=`quaternion`,Oo.prototype.InterpolantFactoryMethodSmooth=void 0;var ko=class extends So{constructor(e,t,n){super(e,t,n)}};ko.prototype.ValueTypeName=`string`,ko.prototype.ValueBufferType=Array,ko.prototype.DefaultInterpolation=L,ko.prototype.InterpolantFactoryMethodLinear=void 0,ko.prototype.InterpolantFactoryMethodSmooth=void 0;var Ao=class extends So{constructor(e,t,n,r){super(e,t,n,r)}};Ao.prototype.ValueTypeName=`vector`;var jo=class extends an{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new q(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Mo=new K,No=new W,Po=new W,Fo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new U(512,512),this.mapType=u,this.map=null,this.mapPass=null,this.matrix=new K,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Jr,this._frameExtents=new U(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;No.setFromMatrixPosition(e.matrixWorld),t.position.copy(No),Po.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Po),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Mo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Mo,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Mo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Io=new W,Lo=new lt,Ro=new W,zo=class extends an{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new K,this.projectionMatrix=new K,this.projectionMatrixInverse=new K,this.coordinateSystem=Ue,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Io,Lo,Ro),Ro.x===1&&Ro.y===1&&Ro.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Io,Lo,Ro.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Io,Lo,Ro),Ro.x===1&&Ro.y===1&&Ro.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Io,Lo,Ro.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Bo=new W,Vo=new U,Ho=new U,Uo=class extends zo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=rt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(nt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rt*2*Math.atan(Math.tan(nt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bo.x,Bo.y).multiplyScalar(-e/Bo.z),Bo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bo.x,Bo.y).multiplyScalar(-e/Bo.z)}getViewSize(e,t){return this.getViewBounds(e,Vo,Ho),t.subVectors(Ho,Vo)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(nt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Wo=class extends zo{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Go=class extends Fo{constructor(){super(new Wo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ko=class extends jo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(an.DEFAULT_UP),this.updateMatrix(),this.target=new an,this.shadow=new Go}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},qo=class extends jo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Jo=-90,Yo=1,Xo=class extends an{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Uo(Jo,Yo,e,t);r.layers=this.layers,this.add(r);let i=new Uo(Jo,Yo,e,t);i.layers=this.layers,this.add(i);let a=new Uo(Jo,Yo,e,t);a.layers=this.layers,this.add(a);let o=new Uo(Jo,Yo,e,t);o.layers=this.layers,this.add(o);let s=new Uo(Jo,Yo,e,t);s.layers=this.layers,this.add(s);let c=new Uo(Jo,Yo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Zo=class extends Uo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Qo=`\\[\\]\\.:\\/`,$o=RegExp(`[\\[\\]\\.:\\/]`,`g`),es=`[^\\[\\]\\.:\\/]`,ts=`[^`+Qo.replace(`\\.`,``)+`]`,ns=`((?:WC+[\\/:])*)`.replace(`WC`,es),rs=`(WCOD+)?`.replace(`WCOD`,ts),is=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,es),as=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,es),os=RegExp(`^`+ns+rs+is+as+`$`),ss=[`material`,`materials`,`bones`,`map`],cs=class{constructor(e,t,n){let r=n||ls.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ls=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace($o,``)}static parseTrackName(e){let t=os.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);ss.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){B(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){V(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){V(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){V(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){V(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){V(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;V(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ls.Composite=cs,ls.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ls.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ls.prototype.GetterByBindingType=[ls.prototype._getValue_direct,ls.prototype._getValue_array,ls.prototype._getValue_arrayElement,ls.prototype._getValue_toArray],ls.prototype.SetterByBindingTypeAndVersioning=[[ls.prototype._setValue_direct,ls.prototype._setValue_direct_setNeedsUpdate,ls.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ls.prototype._setValue_array,ls.prototype._setValue_array_setNeedsUpdate,ls.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ls.prototype._setValue_arrayElement,ls.prototype._setValue_arrayElement_setNeedsUpdate,ls.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ls.prototype._setValue_fromArray,ls.prototype._setValue_fromArray_setNeedsUpdate,ls.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};var us=new W,ds,fs,ps=class extends an{constructor(e=new W(0,0,1),t=new W(0,0,0),n=1,r=16776960,i=n*.2,a=i*.2){super(),this.type=`ArrowHelper`,ds===void 0&&(ds=new cr,ds.setAttribute(`position`,new Xn([0,0,0,0,1,0],3)),fs=new Si(.5,1,5,1),fs.translate(0,-.5,0)),this.position.copy(t),this.line=new ri(ds,new Yr({color:r,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Mr(fs,new br({color:r,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,i,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{us.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(us,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}};function ms(e,t,n,r){let i=hs(r);switch(n){case C:return e*t;case O:return e*t/i.components*i.byteLength;case ee:return e*t/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case te:return e*t*2/i.components*i.byteLength;case w:return e*t*3/i.components*i.byteLength;case T:return e*t*4/i.components*i.byteLength;case ne:return e*t*4/i.components*i.byteLength;case A:case j:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case M:case N:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case P:case ae:return Math.max(e,16)*Math.max(t,8)/4;case re:case ie:return Math.max(e,8)*Math.max(t,8)/2;case oe:case se:case F:case I:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ce:case le:case ue:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case de:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case fe:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case pe:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case me:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case he:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ge:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case _e:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ve:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ye:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case xe:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Se:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ce:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case we:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Te:case Ee:case De:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Oe:case ke:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ae:case je:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function hs(e){switch(e){case u:case d:return{byteLength:1,components:1};case p:case f:case _:return{byteLength:2,components:1};case v:case y:return{byteLength:2,components:4};case h:case m:case g:return{byteLength:4,components:1};case x:case S:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?B(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function gs(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function _s(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var J={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Y={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new G}},envmap:{envMap:{value:null},envMapRotation:{value:new G},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new G}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new G}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new G},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new G},normalScale:{value:new U(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new G},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new G}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new G}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new G}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0},uvTransform:{value:new G}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new U(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new G},alphaMap:{value:null},alphaMapTransform:{value:new G},alphaTest:{value:0}}},vs={basic:{uniforms:Qa([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.fog]),vertexShader:J.meshbasic_vert,fragmentShader:J.meshbasic_frag},lambert:{uniforms:Qa([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new q(0)},envMapIntensity:{value:1}}]),vertexShader:J.meshlambert_vert,fragmentShader:J.meshlambert_frag},phong:{uniforms:Qa([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:J.meshphong_vert,fragmentShader:J.meshphong_frag},standard:{uniforms:Qa([Y.common,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.roughnessmap,Y.metalnessmap,Y.fog,Y.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:J.meshphysical_vert,fragmentShader:J.meshphysical_frag},toon:{uniforms:Qa([Y.common,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.gradientmap,Y.fog,Y.lights,{emissive:{value:new q(0)}}]),vertexShader:J.meshtoon_vert,fragmentShader:J.meshtoon_frag},matcap:{uniforms:Qa([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,{matcap:{value:null}}]),vertexShader:J.meshmatcap_vert,fragmentShader:J.meshmatcap_frag},points:{uniforms:Qa([Y.points,Y.fog]),vertexShader:J.points_vert,fragmentShader:J.points_frag},dashed:{uniforms:Qa([Y.common,Y.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:J.linedashed_vert,fragmentShader:J.linedashed_frag},depth:{uniforms:Qa([Y.common,Y.displacementmap]),vertexShader:J.depth_vert,fragmentShader:J.depth_frag},normal:{uniforms:Qa([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,{opacity:{value:1}}]),vertexShader:J.meshnormal_vert,fragmentShader:J.meshnormal_frag},sprite:{uniforms:Qa([Y.sprite,Y.fog]),vertexShader:J.sprite_vert,fragmentShader:J.sprite_frag},background:{uniforms:{uvTransform:{value:new G},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:J.background_vert,fragmentShader:J.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new G}},vertexShader:J.backgroundCube_vert,fragmentShader:J.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:J.cube_vert,fragmentShader:J.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:J.equirect_vert,fragmentShader:J.equirect_frag},distance:{uniforms:Qa([Y.common,Y.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:J.distance_vert,fragmentShader:J.distance_frag},shadow:{uniforms:Qa([Y.lights,Y.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:J.shadow_vert,fragmentShader:J.shadow_frag}};vs.physical={uniforms:Qa([vs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new G},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new G},clearcoatNormalScale:{value:new U(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new G},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new G},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new G},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new G},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new G},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new G},transmissionSamplerSize:{value:new U},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new G},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new G},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new G},anisotropyVector:{value:new U},anisotropyMap:{value:null},anisotropyMapTransform:{value:new G}}]),vertexShader:J.meshphysical_vert,fragmentShader:J.meshphysical_frag};var ys={r:0,b:0,g:0},bs=new K,xs=new G;xs.set(-1,0,0,0,1,0,0,0,1);function Ss(e,t,n,r,i,a){let o=new q(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Mr(new bi(1,1,1),new ao({name:`BackgroundCubeMaterial`,uniforms:Za(vs.backgroundCube.uniforms),vertexShader:vs.backgroundCube.vertexShader,fragmentShader:vs.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(bs.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(xs),l.material.toneMapped=gt.getTransfer(i.colorSpace)!==Be,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Mr(new Wa(2,2),new ao({name:`BackgroundMaterial`,uniforms:Za(vs.background.uniforms),vertexShader:vs.background.vertexShader,fragmentShader:vs.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=gt.getTransfer(i.colorSpace)!==Be,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(ys,to(e)),n.buffers.color.setClear(ys.r,ys.g,ys.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Cs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function ws(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Ts(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(B(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&B(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Es(e){let t=this,n=null,r=0,i=!1,a=!1,o=new fr,s=new G,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Ds=4,Os=6,ks=20,As=256,js=new Wo,Ms=new q,Ns=null,Ps=0,Fs=0,Is=!1,Ls=new W,Rs=new W,zs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Ls}=i;Ns=this._renderer.getRenderTarget(),Ps=this._renderer.getActiveCubeFace(),Fs=this._renderer.getActiveMipmapLevel(),Is=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ks(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gs(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ns,Ps,Fs),this._renderer.xr.enabled=Is,e.scissorTest=!1,Hs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ns=this._renderer.getRenderTarget(),Ps=this._renderer.getActiveCubeFace(),Fs=this._renderer.getActiveMipmapLevel(),Is=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:s,minFilter:s,generateMipmaps:!1,type:_,format:T,colorSpace:Re,depthBuffer:!1},r=Vs(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vs(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Bs(r)),this._blurMaterial=Ws(r,e,t),this._ggxMaterial=Us(r,e,t)}return r}_compileMaterial(e){let t=new Mr(new cr,e);this._renderer.compile(t,js)}_sceneToCubeUV(e,t,n,r,i){let a=new Uo(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Ms),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Mr(new bi,new br({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Ms),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Hs(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ks()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gs());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Hs(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,js)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Ds?n-d+Ds:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Hs(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,js),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Hs(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,js)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Hs(t,3*l*(r>this._lodMax-Ds?r-this._lodMax+Ds:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,js)}};function Bs(e){let t=[],n=[],r=e,i=e-Ds+1+Os;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Rs.set(1,r,n):e===1?Rs.set(-n,1,-r):e===2?Rs.set(-n,r,1):e===3?Rs.set(-1,r,-n):e===4?Rs.set(-n,-1,r):Rs.set(n,r,-1),Rs.toArray(l,(e*6+t)*3)}}let u=new cr;u.setAttribute(`position`,new qn(c,3)),u.setAttribute(`outputDirection`,new qn(l,3)),n.push(new Mr(u,null)),r>Ds&&r--}return{lodMeshes:n,sizeLods:t}}function Vs(e,t,n){let r=new kt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Hs(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Us(e,t,n){return new ao({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:As,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ws(e,t,n){return new ao({name:`SphericalGaussianBlur`,defines:{SAMPLES:ks,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:qs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Gs(){return new ao({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ks(){return new ao({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function qs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Js=class extends kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new hi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new bi(5,5,5),i=new ao({name:`CubemapFromEquirect`,uniforms:Za(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Mr(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=s),new Xo(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Ys(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Js(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new zs(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new zs(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Xs(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ze(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Zs(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Yn:Jn)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Qs(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function $s(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:V(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function ec(e,t,n){let r=new WeakMap,i=new Dt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),_=new At(h,p,m,u);_.type=g,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new U(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function tc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var nc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function rc(e,t,n,r,i,a){let o=new kt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new cr;l.setAttribute(`position`,new Xn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Xn([0,2,0,0,2,0],2));let u=new oo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Mr(l,u),f=new Wo(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new kt(t,n,{type:_,depthBuffer:!1,stencilBuffer:!1}),c=new kt(t,n,{type:_,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},gt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=nc[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(d,f),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var ic=new Et,ac=new _i(1,1),oc=new At,sc=new jt,cc=new hi,lc=[],uc=[],dc=new Float32Array(16),fc=new Float32Array(9),pc=new Float32Array(4);function mc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=lc[i];if(a===void 0&&(a=new Float32Array(i),lc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function hc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function gc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function _c(e,t){let n=uc[t];n===void 0&&(n=new Int32Array(t),uc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function vc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(hc(n,t))return;e.uniform2fv(this.addr,t),gc(n,t)}}function bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(hc(n,t))return;e.uniform3fv(this.addr,t),gc(n,t)}}function xc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(hc(n,t))return;e.uniform4fv(this.addr,t),gc(n,t)}}function Sc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(hc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),gc(n,t)}else{if(hc(n,r))return;pc.set(r),e.uniformMatrix2fv(this.addr,!1,pc),gc(n,r)}}function Cc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(hc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),gc(n,t)}else{if(hc(n,r))return;fc.set(r),e.uniformMatrix3fv(this.addr,!1,fc),gc(n,r)}}function wc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(hc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),gc(n,t)}else{if(hc(n,r))return;dc.set(r),e.uniformMatrix4fv(this.addr,!1,dc),gc(n,r)}}function Tc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ec(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(hc(n,t))return;e.uniform2iv(this.addr,t),gc(n,t)}}function Dc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(hc(n,t))return;e.uniform3iv(this.addr,t),gc(n,t)}}function Oc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(hc(n,t))return;e.uniform4iv(this.addr,t),gc(n,t)}}function kc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Ac(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(hc(n,t))return;e.uniform2uiv(this.addr,t),gc(n,t)}}function jc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(hc(n,t))return;e.uniform3uiv(this.addr,t),gc(n,t)}}function Mc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(hc(n,t))return;e.uniform4uiv(this.addr,t),gc(n,t)}}function Nc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(ac.compareFunction=n.isReversedDepthBuffer()?518:515,a=ac):a=ic,n.setTexture2D(t||a,i)}function Pc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||sc,i)}function Fc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||cc,i)}function Ic(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||oc,i)}function Lc(e){switch(e){case 5126:return vc;case 35664:return yc;case 35665:return bc;case 35666:return xc;case 35674:return Sc;case 35675:return Cc;case 35676:return wc;case 5124:case 35670:return Tc;case 35667:case 35671:return Ec;case 35668:case 35672:return Dc;case 35669:case 35673:return Oc;case 5125:return kc;case 36294:return Ac;case 36295:return jc;case 36296:return Mc;case 35678:case 36198:case 36298:case 36306:case 35682:return Nc;case 35679:case 36299:case 36307:return Pc;case 35680:case 36300:case 36308:case 36293:return Fc;case 36289:case 36303:case 36311:case 36292:return Ic}}function Rc(e,t){e.uniform1fv(this.addr,t)}function zc(e,t){let n=mc(t,this.size,2);e.uniform2fv(this.addr,n)}function Bc(e,t){let n=mc(t,this.size,3);e.uniform3fv(this.addr,n)}function Vc(e,t){let n=mc(t,this.size,4);e.uniform4fv(this.addr,n)}function Hc(e,t){let n=mc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Uc(e,t){let n=mc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Wc(e,t){let n=mc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Gc(e,t){e.uniform1iv(this.addr,t)}function Kc(e,t){e.uniform2iv(this.addr,t)}function qc(e,t){e.uniform3iv(this.addr,t)}function Jc(e,t){e.uniform4iv(this.addr,t)}function Yc(e,t){e.uniform1uiv(this.addr,t)}function Xc(e,t){e.uniform2uiv(this.addr,t)}function Zc(e,t){e.uniform3uiv(this.addr,t)}function Qc(e,t){e.uniform4uiv(this.addr,t)}function $c(e,t,n){let r=this.cache,i=t.length,a=_c(n,i);hc(r,a)||(e.uniform1iv(this.addr,a),gc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?ac:ic;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function el(e,t,n){let r=this.cache,i=t.length,a=_c(n,i);hc(r,a)||(e.uniform1iv(this.addr,a),gc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||sc,a[e])}function tl(e,t,n){let r=this.cache,i=t.length,a=_c(n,i);hc(r,a)||(e.uniform1iv(this.addr,a),gc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||cc,a[e])}function nl(e,t,n){let r=this.cache,i=t.length,a=_c(n,i);hc(r,a)||(e.uniform1iv(this.addr,a),gc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||oc,a[e])}function rl(e){switch(e){case 5126:return Rc;case 35664:return zc;case 35665:return Bc;case 35666:return Vc;case 35674:return Hc;case 35675:return Uc;case 35676:return Wc;case 5124:case 35670:return Gc;case 35667:case 35671:return Kc;case 35668:case 35672:return qc;case 35669:case 35673:return Jc;case 5125:return Yc;case 36294:return Xc;case 36295:return Zc;case 36296:return Qc;case 35678:case 36198:case 36298:case 36306:case 35682:return $c;case 35679:case 36299:case 36307:return el;case 35680:case 36300:case 36308:case 36293:return tl;case 36289:case 36303:case 36311:case 36292:return nl}}var il=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lc(t.type)}},al=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rl(t.type)}},ol=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},sl=/(\w+)(\])?(\[|\.)?/g;function cl(e,t){e.seq.push(t),e.map[t.id]=t}function ll(e,t,n){let r=e.name,i=r.length;for(sl.lastIndex=0;;){let a=sl.exec(r),o=sl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){cl(n,l===void 0?new il(s,e,t):new al(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new ol(s),cl(n,e)),n=e}}}var ul=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);ll(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function dl(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var fl=37297,pl=0;function ml(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var hl=new G;function gl(e){gt._getMatrix(hl,gt.workingColorSpace,e);let t=`mat3( ${hl.elements.map(e=>e.toFixed(4))} )`;switch(gt.getTransfer(e)){case ze:return[t,`LinearTransferOETF`];case Be:return[t,`sRGBTransferOETF`];default:return B(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function _l(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+ml(e.getShaderSource(t),r)}return i}function vl(e,t){let n=gl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var yl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function bl(e,t){let n=yl[t];return n===void 0?(B(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var xl=new W;function Sl(){return gt.getLuminanceCoefficients(xl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${xl.x.toFixed(4)}, ${xl.y.toFixed(4)}, ${xl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Cl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(El).join(`
`)}function wl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Tl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function El(e){return e!==``}function Dl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ol(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var kl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Al(e){return e.replace(kl,Ml)}var jl=new Map;function Ml(e,t){let n=J[t];if(n===void 0){let e=jl.get(t);if(e!==void 0)n=J[e],B(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Al(n)}var Nl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pl(e){return e.replace(Nl,Fl)}function Fl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Il(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Ll={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Rl(e){return Ll[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var zl={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Bl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:zl[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Vl={302:`ENVMAP_MODE_REFRACTION`};function Hl(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Vl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Ul={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Wl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Ul[e.combine]||`ENVMAP_BLENDING_NONE`}function Gl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Kl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Rl(n),l=Bl(n),u=Hl(n),d=Wl(n),f=Gl(n),p=Cl(n),m=wl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(El).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(El).join(`
`),_.length>0&&(_+=`
`)):(g=[Il(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(El).join(`
`),_=[Il(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:J.tonemapping_pars_fragment,n.toneMapping===0?``:bl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,J.colorspace_pars_fragment,vl(`linearToOutputTexel`,n.outputColorSpace),Sl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(El).join(`
`)),o=Al(o),o=Dl(o,n),o=Ol(o,n),s=Al(s),s=Dl(s,n),s=Ol(s,n),o=Pl(o),s=Pl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=dl(i,i.VERTEX_SHADER,y),S=dl(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=_l(i,x,`vertex`),n=_l(i,S,`fragment`);V(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):B(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new ul(i,h),T=Tl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,fl)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=pl++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var ql=0,Jl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Yl(e),t.set(e,n)),n}},Yl=class{constructor(e){this.id=ql++,this.code=e,this.usedTimes=0}};function Xl(e){return e===1030||e===37490||e===36285}function Zl(e,t,n,r,i,a){let o=new Ht,s=new Jl,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&B(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,ee,k;if(C){let e=vs[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),ee=e.id,k=t.id}let te=e.getRenderTarget(),ne=e.state.buffers.depth.getReversed(),A=h.isInstancedMesh===!0,j=h.isBatchedMesh===!0,M=!!i.map,N=!!i.matcap,re=!!x,P=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,F=!!i.metalnessMap,I=!!i.roughnessMap,le=i.anisotropy>0,ue=i.clearcoat>0,de=i.dispersion>0,fe=i.retroreflectivity>0,pe=i.iridescence>0,me=i.sheen>0,he=i.transmission>0,ge=le&&!!i.anisotropyMap,_e=ue&&!!i.clearcoatMap,ve=ue&&!!i.clearcoatNormalMap,ye=ue&&!!i.clearcoatRoughnessMap,be=pe&&!!i.iridescenceMap,xe=pe&&!!i.iridescenceThicknessMap,Se=me&&!!i.sheenColorMap,Ce=me&&!!i.sheenRoughnessMap,we=!!i.specularMap,Te=!!i.specularColorMap,Ee=!!i.specularIntensityMap,De=he&&!!i.transmissionMap,Oe=he&&!!i.thicknessMap,ke=!!i.gradientMap,Ae=!!i.alphaMap,je=i.alphaTest>0,L=!!i.alphaHash,Me=!!i.extensions,Ne=0;i.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Ne=e.toneMapping);let Pe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:ee,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:j,batchingColor:j&&h._colorsTexture!==null,instancing:A,instancingColor:A&&h.instanceColor!==null,instancingMorph:A&&h.morphTexture!==null,outputColorSpace:te===null?e.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:gt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:M,matcap:N,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:P,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&Xl(i.normalMap.format),metalnessMap:F,roughnessMap:I,anisotropy:le,anisotropyMap:ge,clearcoat:ue,clearcoatMap:_e,clearcoatNormalMap:ve,clearcoatRoughnessMap:ye,dispersion:de,retroreflection:fe,iridescence:pe,iridescenceMap:be,iridescenceThicknessMap:xe,sheen:me,sheenColorMap:Se,sheenRoughnessMap:Ce,specularMap:we,specularColorMap:Te,specularIntensityMap:Ee,transmission:he,transmissionMap:De,thicknessMap:Oe,gradientMap:ke,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ae,alphaTest:je,alphaHash:L,combine:i.combine,mapUv:M&&m(i.map.channel),aoMapUv:P&&m(i.aoMap.channel),lightMapUv:ie&&m(i.lightMap.channel),bumpMapUv:ae&&m(i.bumpMap.channel),normalMapUv:oe&&m(i.normalMap.channel),displacementMapUv:se&&m(i.displacementMap.channel),emissiveMapUv:ce&&m(i.emissiveMap.channel),metalnessMapUv:F&&m(i.metalnessMap.channel),roughnessMapUv:I&&m(i.roughnessMap.channel),anisotropyMapUv:ge&&m(i.anisotropyMap.channel),clearcoatMapUv:_e&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&m(i.sheenRoughnessMap.channel),specularMapUv:we&&m(i.specularMap.channel),specularColorMapUv:Te&&m(i.specularColorMap.channel),specularIntensityMapUv:Ee&&m(i.specularIntensityMap.channel),transmissionMapUv:De&&m(i.transmissionMap.channel),thicknessMapUv:Oe&&m(i.thicknessMap.channel),alphaMapUv:Ae&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(oe||le),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(M||Ae),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ne,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ne,decodeVideoTexture:M&&i.map.isVideoTexture===!0&&gt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&gt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Me&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Me&&i.extensions.multiDraw===!0||j)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=vs[t];n=no.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Kl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Ql(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function $l(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function eu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function tu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||$l),r.length>1&&r.sort(t||eu),i.length>1&&i.sort(t||eu)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function nu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new tu,e.set(t,[i])):n>=r.length?(i=new tu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function ru(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new W,color:new q};break;case`SpotLight`:n={position:new W,direction:new W,color:new q,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new W,color:new q,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new W,skyColor:new q,groundColor:new q};break;case`RectAreaLight`:n={color:new q,position:new W,halfWidth:new W,halfHeight:new W}}return e[t.id]=n,n}}}function iu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var au=0;function ou(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function su(e){let t=new ru,n=iu(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new W);let i=new W,a=new K,o=new K;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(ou);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Y.LTC_FLOAT_1,r.rectAreaLTC2=Y.LTC_FLOAT_2):(r.rectAreaLTC1=Y.LTC_HALF_1,r.rectAreaLTC2=Y.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=au++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function cu(e){let t=new su(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function lu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new cu(e),t.set(n,[a])):r>=i.length?(a=new cu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var uu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,du=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,fu=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],pu=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],mu=new K,hu=new W,gu=new W;function _u(e,t,n){let r=new Jr,a=new U,o=new U,c=new Dt,l=new lo,u=new uo,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},m=new ao({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new U},radius:{value:4}},vertexShader:uu,fragmentShader:du}),v=m.clone();v.defines.HORIZONTAL_PASS=1;let y=new cr;y.setAttribute(`position`,new qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Mr(y,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(B(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){B(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),o.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(o.x=Math.floor(f/y.x),a.x=o.x*y.x,p.mapSize.x=o.x),a.y>f&&(o.y=Math.floor(f/y.y),a.y=o.y*y.y,p.mapSize.y=o.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){B(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new kt(a.x,a.y,{format:k,type:_,minFilter:s,magFilter:s,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new _i(a.x,a.y,g),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=E,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=i,p.map.depthTexture.magFilter=i}else d.isPointLight?(p.map=new Js(a.x),p.map.depthTexture=new vi(a.x,h)):(p.map=new kt(a.x,a.y),p.map.depthTexture=new _i(a.x,a.y,h)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=E,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=s,p.map.depthTexture.magFilter=s):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=i,p.map.depthTexture.magFilter=i);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let i=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),hu.setFromMatrixPosition(d.matrixWorld),e.position.copy(hu),gu.copy(e.position),gu.add(fu[t]),e.up.copy(pu[t]),e.lookAt(gu),e.updateMatrixWorld(),n.makeTranslation(-hu.x,-hu.y,-hu.z),mu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(mu,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(o.x*n.x,o.y*n.y,o.x*n.z,o.y*n.w),m.viewport(c)}r=p.getFrustum(t),T(n,l,i,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new kt(a.x,a.y,{format:k,type:_}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),m.uniforms.shadow_pass.value=n.map.depthTexture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,m,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function T(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)T(c[e],i,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function vu(e,t){function n(){let t=!1,n=new Dt,r=null,i=new Dt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?F(e.DEPTH_TEST):I(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=$e[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?F(e.STENCIL_TEST):I(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,ee=null,k=null,te=null,ne=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),A=!1,j=0,M=e.getParameter(e.VERSION);M.indexOf(`WebGL`)===-1?M.indexOf(`OpenGL ES`)!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(M)[1]),A=j>=2):(j=parseFloat(/^WebGL (\d)/.exec(M)[1]),A=j>=1);let N=null,re={},P=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new Dt().fromArray(P),oe=new Dt().fromArray(ie);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),F(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),F(e.CULL_FACE),me(0);function F(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function I(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function le(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ue(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(I(e.BLEND),g=!1);return}if(g===!1&&(F(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:V(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:V(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:V(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:V(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function he(t,n){t.side===2?I(e.CULL_FACE):F(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ye(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?F(e.SAMPLE_ALPHA_TO_COVERAGE):I(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function _e(t){t===0?I(e.CULL_FACE):(F(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ve(t){t!==ee&&(A&&e.lineWidth(t),ee=t)}function ye(t,n,r){t?(F(e.POLYGON_OFFSET_FILL),(k!==n||te!==r)&&(k=n,te=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):I(e.POLYGON_OFFSET_FILL)}function be(t){t?F(e.SCISSOR_TEST):I(e.SCISSOR_TEST)}function xe(t){t===void 0&&(t=e.TEXTURE0+ne-1),N!==t&&(e.activeTexture(t),N=t)}function Se(t,n,r){r===void 0&&(r=N===null?e.TEXTURE0+ne-1:N);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(N!==r&&(e.activeTexture(r),N=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function Ce(){let t=re[N];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function we(){try{e.compressedTexImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Te(){try{e.compressedTexImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ee(){try{e.texSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function De(){try{e.texSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Oe(){try{e.compressedTexSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function ke(){try{e.compressedTexSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ae(){try{e.texStorage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function je(){try{e.texStorage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function L(){try{e.texImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Me(){try{e.texImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ne(t){return d[t]===void 0?e.getParameter(t):d[t]}function Pe(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function R(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Fe(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function z(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ie(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},N=null,re={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,ee=null,k=null,te=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:F,disable:I,bindFramebuffer:le,drawBuffers:ue,useProgram:de,setBlending:me,setMaterial:he,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:ye,setScissorTest:be,activeTexture:xe,bindTexture:Se,unbindTexture:Ce,compressedTexImage2D:we,compressedTexImage3D:Te,texImage2D:L,texImage3D:Me,pixelStorei:Pe,getParameter:Ne,updateUBOMapping:z,uniformBlockBinding:Ie,texStorage2D:Ae,texStorage3D:je,texSubImage2D:Ee,texSubImage3D:De,compressedTexSubImage2D:Oe,compressedTexSubImage3D:ke,scissor:R,viewport:Fe,reset:Le}}function yu(e,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new U,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Ke(`canvas`)}function T(e,t,n){let r=1,i=Ne(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),B(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&B(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function O(t){e.generateMipmap(t)}function ee(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function k(t,n,r,i,a,o=!1){if(t!==null){if(e[t]!==void 0)return e[t];B(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+t+`'`)}let s;i&&(s=u.get(`EXT_texture_norm16`),s||B(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let c=n;if(n===e.RED&&(r===e.FLOAT&&(c=e.R32F),r===e.HALF_FLOAT&&(c=e.R16F),r===e.UNSIGNED_BYTE&&(c=e.R8),r===e.UNSIGNED_SHORT&&s&&(c=s.R16_EXT),r===e.SHORT&&s&&(c=s.R16_SNORM_EXT)),n===e.RED_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.R8UI),r===e.UNSIGNED_SHORT&&(c=e.R16UI),r===e.UNSIGNED_INT&&(c=e.R32UI),r===e.BYTE&&(c=e.R8I),r===e.SHORT&&(c=e.R16I),r===e.INT&&(c=e.R32I)),n===e.RG&&(r===e.FLOAT&&(c=e.RG32F),r===e.HALF_FLOAT&&(c=e.RG16F),r===e.UNSIGNED_BYTE&&(c=e.RG8),r===e.UNSIGNED_SHORT&&s&&(c=s.RG16_EXT),r===e.SHORT&&s&&(c=s.RG16_SNORM_EXT)),n===e.RG_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RG8UI),r===e.UNSIGNED_SHORT&&(c=e.RG16UI),r===e.UNSIGNED_INT&&(c=e.RG32UI),r===e.BYTE&&(c=e.RG8I),r===e.SHORT&&(c=e.RG16I),r===e.INT&&(c=e.RG32I)),n===e.RGB_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RGB8UI),r===e.UNSIGNED_SHORT&&(c=e.RGB16UI),r===e.UNSIGNED_INT&&(c=e.RGB32UI),r===e.BYTE&&(c=e.RGB8I),r===e.SHORT&&(c=e.RGB16I),r===e.INT&&(c=e.RGB32I)),n===e.RGBA_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RGBA8UI),r===e.UNSIGNED_SHORT&&(c=e.RGBA16UI),r===e.UNSIGNED_INT&&(c=e.RGBA32UI),r===e.BYTE&&(c=e.RGBA8I),r===e.SHORT&&(c=e.RGBA16I),r===e.INT&&(c=e.RGBA32I)),n===e.RGB&&(r===e.UNSIGNED_SHORT&&s&&(c=s.RGB16_EXT),r===e.SHORT&&s&&(c=s.RGB16_SNORM_EXT),r===e.UNSIGNED_INT_5_9_9_9_REV&&(c=e.RGB9_E5),r===e.UNSIGNED_INT_10F_11F_11F_REV&&(c=e.R11F_G11F_B10F)),n===e.RGBA){let t=o?ze:gt.getTransfer(a);r===e.FLOAT&&(c=e.RGBA32F),r===e.HALF_FLOAT&&(c=e.RGBA16F),r===e.UNSIGNED_BYTE&&(c=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),r===e.UNSIGNED_SHORT&&s&&(c=s.RGBA16_EXT),r===e.SHORT&&s&&(c=s.RGBA16_SNORM_EXT),r===e.UNSIGNED_SHORT_4_4_4_4&&(c=e.RGBA4),r===e.UNSIGNED_SHORT_5_5_5_1&&(c=e.RGB5_A1)}return(c===e.R16F||c===e.R32F||c===e.RG16F||c===e.RG32F||c===e.RGBA16F||c===e.RGBA32F)&&u.get(`EXT_color_buffer_float`),c}function te(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,B(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function ne(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function A(e){let t=e.target;t.removeEventListener(`dispose`,A),M(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function j(e){let t=e.target;t.removeEventListener(`dispose`,j),re(t)}function M(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&N(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function N(t){let n=f.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,i=S.get(r);delete i[n.__cacheKey],h.memory.textures--}function re(t){let n=f.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),f.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=t.textures;for(let t=0,n=r.length;t<n;t++){let n=f.get(r[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),f.remove(r[t])}f.remove(t)}let P=0;function ie(){P=0}function ae(){return P}function oe(e){P=e}function se(){let e=P;return e>=p.maxTextures&&B(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),P+=1,e}function ce(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function F(t,n){let r=f.get(t);if(t.isVideoTexture&&L(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&r.__version!==t.version){let e=t.image;if(e===null)B(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)B(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ve(r,t,n);return}}else t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null);d.bindTexture(e.TEXTURE_2D,r.__webglTexture,e.TEXTURE0+n)}function I(t,n){let r=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version){ve(r,t,n);return}t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null),d.bindTexture(e.TEXTURE_2D_ARRAY,r.__webglTexture,e.TEXTURE0+n)}function le(t,n){let r=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version){ve(r,t,n);return}d.bindTexture(e.TEXTURE_3D,r.__webglTexture,e.TEXTURE0+n)}function ue(t,n){let r=f.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&r.__version!==t.version){ye(r,t,n);return}d.bindTexture(e.TEXTURE_CUBE_MAP,r.__webglTexture,e.TEXTURE0+n)}let de={[t]:e.REPEAT,[n]:e.CLAMP_TO_EDGE,[r]:e.MIRRORED_REPEAT},fe={[i]:e.NEAREST,[a]:e.NEAREST_MIPMAP_NEAREST,[o]:e.NEAREST_MIPMAP_LINEAR,[s]:e.LINEAR,[c]:e.LINEAR_MIPMAP_NEAREST,[l]:e.LINEAR_MIPMAP_LINEAR},pe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function me(t,n){if(n.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(n.magFilter===1006||n.magFilter===1007||n.magFilter===1005||n.magFilter===1008||n.minFilter===1006||n.minFilter===1007||n.minFilter===1005||n.minFilter===1008)&&B(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(t,e.TEXTURE_WRAP_S,de[n.wrapS]),e.texParameteri(t,e.TEXTURE_WRAP_T,de[n.wrapT]),(t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY)&&e.texParameteri(t,e.TEXTURE_WRAP_R,de[n.wrapR]),e.texParameteri(t,e.TEXTURE_MAG_FILTER,fe[n.magFilter]),e.texParameteri(t,e.TEXTURE_MIN_FILTER,fe[n.minFilter]),n.compareFunction&&(e.texParameteri(t,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(t,e.TEXTURE_COMPARE_FUNC,pe[n.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(n.magFilter===1003||n.minFilter!==1005&&n.minFilter!==1008||n.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(n.anisotropy>1||f.get(n).__currentAnisotropy){let r=u.get(`EXT_texture_filter_anisotropic`);e.texParameterf(t,r.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(n.anisotropy,p.getMaxAnisotropy())),f.get(n).__currentAnisotropy=n.anisotropy}}}function he(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,A));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let o=ce(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&N(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function ge(e,t,n){return Math.floor(Math.floor(e/n)/t)}function _e(t,n,r,i){let a=t.updateRanges;if(a.length===0)d.texSubImage2D(e.TEXTURE_2D,0,0,0,n.width,n.height,r,i,n.data);else{a.sort((e,t)=>e.start-t.start);let o=0;for(let e=1;e<a.length;e++){let t=a[o],r=a[e],i=t.start+t.count,s=ge(r.start,n.width,4),c=ge(t.start,n.width,4);r.start<=i+1&&s===c&&ge(r.start+r.count-1,n.width,4)===s?t.count=Math.max(t.count,r.start+r.count-t.start):(++o,a[o]=r)}a.length=o+1;let s=d.getParameter(e.UNPACK_ROW_LENGTH),c=d.getParameter(e.UNPACK_SKIP_PIXELS),l=d.getParameter(e.UNPACK_SKIP_ROWS);d.pixelStorei(e.UNPACK_ROW_LENGTH,n.width);for(let t=0,o=a.length;t<o;t++){let o=a[t],s=Math.floor(o.start/4),c=Math.ceil(o.count/4),l=s%n.width,u=Math.floor(s/n.width),f=c;d.pixelStorei(e.UNPACK_SKIP_PIXELS,l),d.pixelStorei(e.UNPACK_SKIP_ROWS,u),d.texSubImage2D(e.TEXTURE_2D,0,l,u,f,1,r,i,n.data)}t.clearUpdateRanges(),d.pixelStorei(e.UNPACK_ROW_LENGTH,s),d.pixelStorei(e.UNPACK_SKIP_PIXELS,c),d.pixelStorei(e.UNPACK_SKIP_ROWS,l)}}function ve(t,n,r){let i=e.TEXTURE_2D;(n.isDataArrayTexture||n.isCompressedArrayTexture)&&(i=e.TEXTURE_2D_ARRAY),n.isData3DTexture&&(i=e.TEXTURE_3D);let a=he(t,n),o=n.source;d.bindTexture(i,t.__webglTexture,e.TEXTURE0+r);let s=f.get(o);if(o.version!==s.__version||a===!0){if(d.activeTexture(e.TEXTURE0+r),!(typeof ImageBitmap<`u`&&n.image instanceof ImageBitmap)){let t=gt.getPrimaries(gt.workingColorSpace),r=n.colorSpace===``?null:gt.getPrimaries(n.colorSpace),i=n.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment);let t=T(n.image,!1,p.maxTextureSize);t=Me(n,t);let c=m.convert(n.format,n.colorSpace),l=m.convert(n.type),u=k(n.internalFormat,c,l,n.normalized,n.colorSpace,n.isVideoTexture);me(i,n);let f,h=n.mipmaps,g=n.isVideoTexture!==!0,_=s.__version===void 0||a===!0,v=o.dataReady,y=ne(n,t);if(n.isDepthTexture)u=te(n.format===D,n.type),_&&(g?d.texStorage2D(e.TEXTURE_2D,1,u,t.width,t.height):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,null));else if(n.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data);n.generateMipmaps=!1}else g?(_&&d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height),v&&_e(n,t,c,l)):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,t.data)}else if(n.isCompressedTexture){if(n.isCompressedArrayTexture){g&&_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,t.depth);for(let r=0,i=h.length;r<i;r++)if(f=h[r],n.format!==1023){if(c!==null){if(g){if(v){if(n.layerUpdates.size>0){let t=ms(f.width,f.height,n.format,n.type);for(let i of n.layerUpdates){let n=f.data.subarray(i*t/f.data.BYTES_PER_ELEMENT,(i+1)*t/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,i,f.width,f.height,1,c,n)}}else d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,f.data)}}else d.compressedTexImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,f.data,0,0)}else B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,l,f.data):d.texImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,c,l,f.data);n.layerUpdates.size>0&&n.clearLayerUpdates()}else{g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,r=h.length;t<r;t++)f=h[t],n.format===1023?g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data):c===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,f.data):d.compressedTexImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,f.data)}}else if(n.isDataArrayTexture){if(g){if(_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,t.width,t.height,t.depth),v){if(n.layerUpdates.size>0){let r=ms(t.width,t.height,n.format,n.type);for(let i of n.layerUpdates){let n=t.data.subarray(i*r/t.data.BYTES_PER_ELEMENT,(i+1)*r/t.data.BYTES_PER_ELEMENT);d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,i,t.width,t.height,1,c,l,n)}n.clearLayerUpdates()}else d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)}}else d.texImage3D(e.TEXTURE_2D_ARRAY,0,u,t.width,t.height,t.depth,0,c,l,t.data)}else if(n.isData3DTexture)g?(_&&d.texStorage3D(e.TEXTURE_3D,y,u,t.width,t.height,t.depth),v&&d.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)):d.texImage3D(e.TEXTURE_3D,0,u,t.width,t.height,t.depth,0,c,l,t.data);else if(n.isFramebufferTexture){if(_){if(g)d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height);else{let n=t.width,r=t.height;for(let t=0;t<y;t++)d.texImage2D(e.TEXTURE_2D,t,u,n,r,0,c,l,null),n>>=1,r>>=1}}}else if(n.isHTMLTexture){if(`texElementImage2D`in e){let r=e.canvas;if(r.hasAttribute(`layoutsubtree`)||r.setAttribute(`layoutsubtree`,`true`),t.parentNode!==r){r.appendChild(t),b.add(n),r.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},r.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=Ne(h[0]);d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height)}for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,c,l,f):d.texImage2D(e.TEXTURE_2D,t,u,c,l,f);n.generateMipmaps=!1}else if(g){if(_){let n=Ne(t);d.texStorage2D(e.TEXTURE_2D,y,u,n.width,n.height)}v&&d.texSubImage2D(e.TEXTURE_2D,0,0,0,c,l,t)}else d.texImage2D(e.TEXTURE_2D,0,u,c,l,t);E(n)&&O(i),s.__version=o.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function ye(t,n,r){if(n.image.length!==6)return;let i=he(t,n),a=n.source;d.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+r);let o=f.get(a);if(a.version!==o.__version||i===!0){d.activeTexture(e.TEXTURE0+r);let t=gt.getPrimaries(gt.workingColorSpace),s=n.colorSpace===``?null:gt.getPrimaries(n.colorSpace),c=n.colorSpace===``||t===s?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let l=n.isCompressedTexture||n.image[0].isCompressedTexture,u=n.image[0]&&n.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!l&&!u?f[e]=T(n.image[e],!0,p.maxCubemapSize):f[e]=u?n.image[e].image:n.image[e],f[e]=Me(n,f[e]);let h=f[0],g=m.convert(n.format,n.colorSpace),_=m.convert(n.type),v=k(n.internalFormat,g,_,n.normalized,n.colorSpace),y=n.isVideoTexture!==!0,b=o.__version===void 0||i===!0,x=a.dataReady,S=ne(n,h);me(e.TEXTURE_CUBE_MAP,n);let C;if(l){y&&b&&d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=f[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];n.format===1023?y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):d.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=n.mipmaps,y&&b){C.length>0&&S++;let t=Ne(f[0]);d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(u){y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,f[t].width,f[t].height,g,_,f[t].data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,f[t].width,f[t].height,0,g,_,f[t].data);for(let n=0;n<C.length;n++){let r=C[n].image[t].image;y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,r.width,r.height,g,_,r.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,r.width,r.height,0,g,_,r.data)}}else{y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,f[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,f[t]);for(let n=0;n<C.length;n++){let r=C[n];y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,g,_,r.image[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,g,_,r.image[t])}}}E(n)&&O(e.TEXTURE_CUBE_MAP),o.__version=a.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function be(t,n,r,i,a,o){let s=m.convert(r.format,r.colorSpace),c=m.convert(r.type),l=k(r.internalFormat,s,c,r.normalized,r.colorSpace),u=f.get(n),p=f.get(r);if(p.__renderTarget=n,!u.__hasExternalTextures){let t=Math.max(1,n.width>>o),r=Math.max(1,n.height>>o);a===e.TEXTURE_3D||a===e.TEXTURE_2D_ARRAY?d.texImage3D(a,o,l,t,r,n.depth,0,s,c,null):d.texImage2D(a,o,l,t,r,0,s,c,null)}d.bindFramebuffer(e.FRAMEBUFFER,t),je(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,i,a,p.__webglTexture,0,Ae(n)):(a===e.TEXTURE_2D||a>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&a<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,i,a,p.__webglTexture,o),d.bindFramebuffer(e.FRAMEBUFFER,null)}function xe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=te(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;je(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ae(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ae(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=k(a.internalFormat,o,s,a.normalized,a.colorSpace);je(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ae(n),c,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ae(n),c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Se(t,n,r){let i=n.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(e.FRAMEBUFFER,t),!(n.depthTexture&&n.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let a=f.get(n.depthTexture);if(a.__renderTarget=n,(!a.__webglTexture||n.depthTexture.image.width!==n.width||n.depthTexture.image.height!==n.height)&&(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),i){if(a.__webglInit===void 0&&(a.__webglInit=!0,n.depthTexture.addEventListener(`dispose`,A)),a.__webglTexture===void 0){a.__webglTexture=e.createTexture(),d.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture),me(e.TEXTURE_CUBE_MAP,n.depthTexture);let t=m.convert(n.depthTexture.format),r=m.convert(n.depthTexture.type),i;n.depthTexture.format===1026?i=e.DEPTH_COMPONENT24:n.depthTexture.format===1027&&(i=e.DEPTH24_STENCIL8);for(let a=0;a<6;a++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,i,n.width,n.height,0,t,r,null)}}else F(n.depthTexture,0);let o=a.__webglTexture,s=Ae(n),c=i?e.TEXTURE_CUBE_MAP_POSITIVE_X+r:e.TEXTURE_2D,l=n.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(n.depthTexture.format===1026)je(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else if(n.depthTexture.format===1027)je(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ce(t){let n=f.get(t),r=t.isWebGLCubeRenderTarget===!0;if(n.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(n.__depthDisposeCallback&&n.__depthDisposeCallback(),e){let t=()=>{delete n.__boundDepthTexture,delete n.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),n.__depthDisposeCallback=t}n.__boundDepthTexture=e}if(t.depthTexture&&!n.__autoAllocateDepthBuffer){if(r)for(let e=0;e<6;e++)Se(n.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Se(n.__webglFramebuffer[0],t,0):Se(n.__webglFramebuffer,t,0)}}else if(r){n.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[r]),n.__webglDepthbuffer[r]===void 0)n.__webglDepthbuffer[r]=e.createRenderbuffer(),xe(n.__webglDepthbuffer[r],t,!1);else{let i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=n.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[0]):d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer),n.__webglDepthbuffer===void 0)n.__webglDepthbuffer=e.createRenderbuffer(),xe(n.__webglDepthbuffer,t,!1);else{let r=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=n.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,r,e.RENDERBUFFER,i)}}d.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,r){let i=f.get(t);n!==void 0&&be(i.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&Ce(t)}function Te(t){let n=t.texture,r=f.get(t),i=f.get(n);t.addEventListener(`dispose`,j);let a=t.textures,o=t.isWebGLCubeRenderTarget===!0,s=a.length>1;if(s||(i.__webglTexture===void 0&&(i.__webglTexture=e.createTexture()),i.__version=n.version,h.memory.textures++),o){r.__webglFramebuffer=[];for(let t=0;t<6;t++)if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer[t]=[];for(let i=0;i<n.mipmaps.length;i++)r.__webglFramebuffer[t][i]=e.createFramebuffer()}else r.__webglFramebuffer[t]=e.createFramebuffer()}else{if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer=[];for(let t=0;t<n.mipmaps.length;t++)r.__webglFramebuffer[t]=e.createFramebuffer()}else r.__webglFramebuffer=e.createFramebuffer();if(s)for(let t=0,n=a.length;t<n;t++){let n=f.get(a[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&je(t)===!1){r.__webglMultisampledFramebuffer=e.createFramebuffer(),r.__webglColorRenderbuffer=[],d.bindFramebuffer(e.FRAMEBUFFER,r.__webglMultisampledFramebuffer);for(let n=0;n<a.length;n++){let i=a[n];r.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,r.__webglColorRenderbuffer[n]);let o=m.convert(i.format,i.colorSpace),s=m.convert(i.type),c=k(i.internalFormat,o,s,i.normalized,i.colorSpace,t.isXRRenderTarget===!0),l=Ae(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,r.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(r.__webglDepthRenderbuffer=e.createRenderbuffer(),xe(r.__webglDepthRenderbuffer,t,!0)),d.bindFramebuffer(e.FRAMEBUFFER,null)}}if(o){d.bindTexture(e.TEXTURE_CUBE_MAP,i.__webglTexture),me(e.TEXTURE_CUBE_MAP,n);for(let i=0;i<6;i++)if(n.mipmaps&&n.mipmaps.length>0)for(let a=0;a<n.mipmaps.length;a++)be(r.__webglFramebuffer[i][a],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,a);else be(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);E(n)&&O(e.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(s){for(let n=0,i=a.length;n<i;n++){let i=a[n],o=f.get(i),s=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(s=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(s,o.__webglTexture),me(s,i),be(r.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0+n,s,0),E(i)&&O(s)}d.unbindTexture()}else{let a=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(a=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(a,i.__webglTexture),me(a,n),n.mipmaps&&n.mipmaps.length>0)for(let i=0;i<n.mipmaps.length;i++)be(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,a,i);else be(r.__webglFramebuffer,t,n,e.COLOR_ATTACHMENT0,a,0);E(n)&&O(a),d.unbindTexture()}t.depthBuffer&&Ce(t)}function Ee(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(E(r)){let t=ee(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),O(t),d.unbindTexture()}}}let De=[],Oe=[];function ke(t){if(t.samples>0){if(je(t)===!1){let n=t.textures,r=t.width,i=t.height,a=e.COLOR_BUFFER_BIT,o=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,s=f.get(t),c=n.length>1;if(c)for(let t=0;t<n.length;t++)d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);d.bindFramebuffer(e.READ_FRAMEBUFFER,s.__webglMultisampledFramebuffer);let l=t.texture.mipmaps;l&&l.length>0?d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer[0]):d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer);for(let l=0;l<n.length;l++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(a|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(a|=e.STENCIL_BUFFER_BIT)),c){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,s.__webglColorRenderbuffer[l]);let t=f.get(n[l]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,r,i,0,0,r,i,a,e.NEAREST),_===!0&&(De.length=0,Oe.length=0,De.push(e.COLOR_ATTACHMENT0+l),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(De.push(o),Oe.push(o),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Oe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,De))}if(d.bindFramebuffer(e.READ_FRAMEBUFFER,null),d.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),c)for(let t=0;t<n.length;t++){d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,s.__webglColorRenderbuffer[t]);let r=f.get(n[t]).__webglTexture;d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,r,0)}d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ae(e){return Math.min(p.maxSamples,e.samples)}function je(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function L(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Me(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(gt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&B(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):V(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ne(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=se,this.resetTextureUnits=ie,this.getTextureUnits=ae,this.setTextureUnits=oe,this.setTexture2D=F,this.setTexture2DArray=I,this.setTexture3D=le,this.setTextureCube=ue,this.rebindTextures=we,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=be,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function bu(e,t){function n(n,r=``){let i,a=gt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var xu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Su=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Cu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new yi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ao({vertexShader:xu,fragmentShader:Su,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mr(new Wa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wu=class extends et{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,d=null,f=null,p=null,m=null,g=typeof XRWebGLBinding<`u`,_=new Cu,v={},y=t.getContextAttributes(),x=null,S=null,C=[],w=[],O=new U,ee=null,k=null,te=new Uo;te.viewport=new Dt;let ne=new Uo;ne.viewport=new Dt;let A=[te,ne],j=new Zo,M=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new cn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new cn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new cn,C[e]=t),t.getHandSpace()};function re(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function P(){r.removeEventListener(`select`,re),r.removeEventListener(`selectstart`,re),r.removeEventListener(`selectend`,re),r.removeEventListener(`squeeze`,re),r.removeEventListener(`squeezestart`,re),r.removeEventListener(`squeezeend`,re),r.removeEventListener(`end`,P),r.removeEventListener(`inputsourceschange`,ie);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}M=null,N=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(ee),e.setSize(O.width,O.height,!1),k!==null){let e=k.camera;e.fov=k.fov,e.zoom=k.zoom,e.updateProjectionMatrix(),k=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,re),r.addEventListener(`selectstart`,re),r.addEventListener(`selectend`,re),r.addEventListener(`squeeze`,re),r.addEventListener(`squeezestart`,re),r.addEventListener(`squeezeend`,re),r.addEventListener(`end`,P),r.addEventListener(`inputsourceschange`,ie),y.xrCompatible!==!0&&await t.makeXRCompatible(),ee=e.getPixelRatio(),e.getSize(O),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?D:E,a=y.stencil?b:h);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new kt(f.textureWidth,f.textureHeight,{format:T,type:u,depthTexture:new _i(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new kt(p.framebufferWidth,p.framebufferHeight,{format:T,type:u,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ue.setContext(r),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ie(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let ae=new W,oe=new W;function se(e,t,n){ae.setFromMatrixPosition(t.matrixWorld),oe.setFromMatrixPosition(n.matrixWorld);let r=ae.distanceTo(oe),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ce(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),j.near=ne.near=te.near=t,j.far=ne.far=te.far=n,(M!==j.near||N!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),M=j.near,N=j.far),j.layers.mask=e.layers.mask|6,te.layers.mask=j.layers.mask&-5,ne.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;ce(j,i);for(let e=0;e<a.length;e++)ce(a[e],i);a.length===2?se(j,te,ne):j.projectionMatrix.copy(te.projectionMatrix),k===null&&e.isPerspectiveCamera&&(k={camera:e,fov:e.fov,zoom:e.zoom}),F(e,j,i)};function F(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=rt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(j)},this.getCameraTexture=function(e){return v[e]};let I=null;function le(t,i){if(l=i.getViewerPose(c||a),m=i,l!==null){let t=l.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=A[n];o===void 0&&(o=new Uo,o.layers.enable(n),o.viewport=new Dt,A[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new yi,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}I&&I(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let ue=new gs;ue.setAnimationLoop(le),this.setAnimationLoop=function(e){I=e},this.dispose=function(){}}},Tu=new K,Eu=new G;Eu.set(-1,0,0,0,1,0,0,0,1);function Du(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,to(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Tu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Eu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Ou(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return V(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?B(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):B(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var ku=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Au=null;function ju(){return Au===null&&(Au=new Fr(ku,16,16,k,_),Au.name=`DFG_LUT`,Au.minFilter=s,Au.magFilter=s,Au.wrapS=n,Au.wrapT=n,Au.generateMipmaps=!1,Au.needsUpdate=!0),Au}var Mu=class{constructor(e={}){let{canvas:t=qe(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:m=!1,outputBufferType:g=u}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=g,C=new Set([ne,te,ee]),w=new Set([u,h,p,b,v,y]),T=new Uint32Array(4),E=new Int32Array(4),D=new W,O=null,k=null,A=[],j=[],M=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,re=!1,P=null,ie=null,ae=null,oe=null;this._outputColorSpace=Le;let se=0,ce=0,F=null,I=-1,le=null,ue=new Dt,de=new Dt,fe=null,pe=new q(0),me=0,he=t.width,ge=t.height,_e=1,ve=null,ye=null,be=new Dt(0,0,he,ge),xe=new Dt(0,0,he,ge),Se=!1,Ce=new Jr,we=!1,Te=!1,Ee=new K,De=new W,Oe=new Dt,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ae=!1;function je(){return F===null?_e:1}let L=n;function Me(e,n){return t.getContext(e,n)}let Ne,Pe,R,Fe,z,Ie,Re,ze,Be,Ve,He,We,Ge,Ke,Je,Xe,Ze,$e,et,tt,nt,rt,it;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,ot,!1),t.addEventListener(`webglcontextrestored`,st,!1),t.addEventListener(`webglcontextcreationerror`,ct,!1),L===null){let t=`webgl2`;if(L=Me(t,e),L===null)throw Me(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}H()}catch(e){throw t.removeEventListener(`webglcontextlost`,ot,!1),t.removeEventListener(`webglcontextrestored`,st,!1),t.removeEventListener(`webglcontextcreationerror`,ct,!1),V(`WebGLRenderer: `+e.message),e}function H(){Ne=new Xs(L),Ne.init(),nt=new bu(L,Ne),Pe=new Ts(L,Ne,e,nt),R=new vu(L,Ne),Pe.reversedDepthBuffer&&m&&R.buffers.depth.setReversed(!0),ie=L.createFramebuffer(),ae=L.createFramebuffer(),oe=L.createFramebuffer(),Fe=new $s(L),z=new Ql,Ie=new yu(L,Ne,R,z,Pe,nt,Fe),Re=new Ys(N),ze=new _s(L),rt=new Cs(L,ze),Be=new Zs(L,ze,Fe,rt),Ve=new tc(L,Be,ze,rt,Fe),$e=new ec(L,Pe,Ie),Je=new Es(z),He=new Zl(N,Re,Ne,Pe,rt,Je),We=new Du(N,z),Ge=new nu,Ke=new lu(Ne),Ze=new Ss(N,Re,R,Ve,x,s),Xe=new _u(N,Ve,Pe),it=new Ou(L,Fe,Pe,R),et=new ws(L,Ne,Fe),tt=new Qs(L,Ne,Fe),Fe.programs=He.programs,N.capabilities=Pe,N.extensions=Ne,N.properties=z,N.renderLists=Ge,N.shadowMap=Xe,N.state=R,N.info=Fe}S!==1009&&(M=new rc(S,t.width,t.height,o,r,i));let at=new wu(N,L);this.xr=at,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return _e},this.setPixelRatio=function(e){e!==void 0&&(_e=e,this.setSize(he,ge,!1))},this.getSize=function(e){return e.set(he,ge)},this.setSize=function(e,n,r=!0){if(at.isPresenting){B(`WebGLRenderer: Can't change size while VR device is presenting.`);return}he=e,ge=n,t.width=Math.floor(e*_e),t.height=Math.floor(n*_e),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),M!==null&&M.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(he*_e,ge*_e).floor()},this.setDrawingBufferSize=function(e,n,r){he=e,ge=n,_e=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009){V(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){B(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}M.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(ue)},this.getViewport=function(e){return e.copy(be)},this.setViewport=function(e,t,n,r){e.isVector4?be.set(e.x,e.y,e.z,e.w):be.set(e,t,n,r),R.viewport(ue.copy(be).multiplyScalar(_e).round())},this.getScissor=function(e){return e.copy(xe)},this.setScissor=function(e,t,n,r){e.isVector4?xe.set(e.x,e.y,e.z,e.w):xe.set(e,t,n,r),R.scissor(de.copy(xe).multiplyScalar(_e).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(e){R.setScissorTest(Se=e)},this.setOpaqueSort=function(e){ve=e},this.setTransparentSort=function(e){ye=e},this.getClearColor=function(e){return e.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor(...arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(F!==null){let t=F.texture.format;e=C.has(t)}if(e){let e=F.texture.type,t=w.has(e),n=Ze.getClearColor(),r=Ze.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,L.clearBufferuiv(L.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,L.clearBufferiv(L.COLOR,0,E))}else r|=L.COLOR_BUFFER_BIT}t&&(r|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&L.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),P=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ot,!1),t.removeEventListener(`webglcontextrestored`,st,!1),t.removeEventListener(`webglcontextcreationerror`,ct,!1),Ze.dispose(),Ge.dispose(),Ke.dispose(),z.dispose(),Re.dispose(),Ve.dispose(),rt.dispose(),it.dispose(),He.dispose(),at.dispose(),at.removeEventListener(`sessionstart`,pt),at.removeEventListener(`sessionend`,mt),ht.stop()};function ot(e){e.preventDefault(),Ye(`WebGLRenderer: Context Lost.`),re=!0}function st(){Ye(`WebGLRenderer: Context Restored.`),re=!1;let e=Fe.autoReset,t=Xe.enabled,n=Xe.autoUpdate,r=Xe.needsUpdate,i=Xe.type;H(),Fe.autoReset=e,Xe.enabled=t,Xe.autoUpdate=n,Xe.needsUpdate=r,Xe.type=i}function ct(e){V(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function U(e){let t=e.target;t.removeEventListener(`dispose`,U),lt(t)}function lt(e){ut(e),z.remove(e)}function ut(e){let t=z.get(e).programs;t!==void 0&&(t.forEach(function(e){He.releaseProgram(e)}),e.isShaderMaterial&&He.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ke);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Et(e,t,n,r,i);R.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Be.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;rt.setup(i,r,s,n,c);let h,g=et;if(c!==null&&(h=ze.get(c),g=tt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(R.setLineWidth(r.wireframeLinewidth*je()),g.setMode(L.LINES)):g.setMode(L.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),R.setLineWidth(e*je()),i.isLineSegments?g.setMode(L.LINES):i.isLineLoop?g.setMode(L.LINE_LOOP):g.setMode(L.LINE_STRIP)}else i.isPoints?g.setMode(L.POINTS):i.isSprite&&g.setMode(L.TRIANGLES);if(i.isBatchedMesh){if(Ne.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ze.get(c).bytesPerElement:1,o=z.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(L,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function dt(e,t,n,r){P!==null&&e.isNodeMaterial&&P.setObject(r,e),we===!0&&Je.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,St(e,t,r),e.side=0,e.needsUpdate=!0,St(e,t,r),e.side=2):St(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),P!==null&&P.renderStart(e,t,n),k=Ke.get(n),k.init(t),j.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),P!==null&&P.updateLights(k.state.lightsArray),Te=this.localClippingEnabled,we=Je.init(this.clippingPlanes,Te),we===!0&&Je.setGlobalState(this.clippingPlanes,t),P!==null&&Xe.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];dt(o,n,t,e),r.add(o)}else dt(i,n,t,e),r.add(i)}}),k=j.pop(),P!==null&&P.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=z.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ne.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let G=null;function ft(e){G&&G(e)}function pt(){ht.stop()}function mt(){ht.start()}let ht=new gs;ht.setAnimationLoop(ft),typeof self<`u`&&ht.setContext(self),this.setAnimationLoop=function(e){G=e,at.setAnimationLoop(e),e===null?ht.stop():ht.start()},at.addEventListener(`sessionstart`,pt),at.addEventListener(`sessionend`,mt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){V(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(re===!0)return;P!==null&&P.renderStart(e,t);let n=at.enabled===!0&&at.isPresenting===!0,r=M!==null&&(F===null||n)&&M.begin(N,F);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(at.cameraAutoUpdate===!0&&at.updateCamera(t),t=at.getCamera()),e.isScene===!0&&e.onBeforeRender(N,e,t,F),k=Ke.get(e,j.length),k.init(t),k.state.textureUnits=Ie.getTextureUnits(),j.push(k),Ee.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Ce.setFromProjectionMatrix(Ee,Ue,t.reversedDepth),Te=this.localClippingEnabled,we=Je.init(this.clippingPlanes,Te),O=Ge.get(e,A.length),O.init(),A.push(O),at.enabled===!0&&at.isPresenting===!0){let e=N.xr.getDepthSensingMesh();e!==null&&_t(e,t,-1/0,N.sortObjects)}_t(e,t,0,N.sortObjects),O.finish(),P!==null&&P.updateLights(k.state.lightsArray),N.sortObjects===!0&&O.sort(ve,ye),Ae=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,Ae&&Ze.addToRenderList(O,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),we===!0&&Je.beginShadows();let i=k.state.shadowsArray;if(Xe.render(i,e,t),we===!0&&Je.endShadows(),(r&&M.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];yt(n,r,e,a)}Ae&&Ze.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];vt(O,e,n,n.viewport)}}else r.length>0&&yt(n,r,e,t),Ae&&Ze.render(e),vt(O,e,t)}F!==null&&ce===0&&(Ie.updateMultisampleRenderTarget(F),Ie.updateRenderTargetMipmap(F)),r&&M.end(N),e.isScene===!0&&e.onAfterRender(N,e,t),rt.resetDefaultState(),I=-1,le=null,j.pop(),j.length>0?(k=j[j.length-1],Ie.setTextureUnits(k.state.textureUnits),we===!0&&Je.setGlobalState(N.clippingPlanes,k.state.camera)):k=null,A.pop(),O=A.length>0?A[A.length-1]:null,P!==null&&P.renderEnd()};function _t(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)k.pushLightProbeGrid(e);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Ce)){r&&Oe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ee);let i=Ve.update(e),a=e.material;a.visible&&O.push(e,i,a,n,Oe.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Ce))){let i=Ve.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Oe.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Oe.copy(e.boundingSphere.center)),Oe.applyMatrix4(e.matrixWorld).applyMatrix4(Ee)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&O.push(e,i,c,n,Oe.z,s,t)}}else a.visible&&O.push(e,i,a,n,Oe.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)_t(i[e],t,n,r)}function vt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),we===!0&&Je.setGlobalState(N.clippingPlanes,n),r&&R.viewport(ue.copy(r)),i.length>0&&bt(i,t,n),a.length>0&&bt(a,t,n),o.length>0&&bt(o,t,n),R.buffers.depth.setTest(!0),R.buffers.depth.setMask(!0),R.buffers.color.setMask(!0),R.setPolygonOffset(!1)}function yt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Ne.has(`EXT_color_buffer_half_float`)||Ne.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new kt(1,1,{generateMipmaps:!0,type:e?_:u,minFilter:l,samples:Math.max(4,Pe.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:gt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||ue;a.setSize(o.z*N.transmissionResolutionScale,o.w*N.transmissionResolutionScale);let s=N.getRenderTarget(),c=N.getActiveCubeFace(),d=N.getActiveMipmapLevel();N.setRenderTarget(a),N.getClearColor(pe),me=N.getClearAlpha(),me<1&&N.setClearColor(16777215,.5),N.clear(),Ae&&Ze.render(n);let f=N.toneMapping;N.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),we===!0&&Je.setGlobalState(N.clippingPlanes,r),bt(e,n,r),Ie.updateMultisampleRenderTarget(a),Ie.updateRenderTargetMipmap(a),Ne.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,xt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Ie.updateMultisampleRenderTarget(a),Ie.updateRenderTargetMipmap(a))}N.setRenderTarget(s,c,d),N.setClearColor(pe,me),p!==void 0&&(r.viewport=p),N.toneMapping=f}function bt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&xt(o,t,n,s,l,c)}}function xt(e,t,n,r,i,a){P!==null&&i.isNodeMaterial&&P.setObject(e,i),e.onBeforeRender(N,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(N,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=2):N.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(N,t,n,r,i,a)}function St(e,t,n){t.isScene!==!0&&(t=ke);let r=z.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=He.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=He.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Re.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,U),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return wt(e,s),d}else s.uniforms=He.getUniforms(e),P!==null&&e.isNodeMaterial&&P.build(e,n,s),e.onBeforeCompile(s,N),d=He.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Je.uniform),wt(e,s),r.needsLights=At(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=k.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Ct(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=ul.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function wt(e,t){let n=z.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Tt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function Et(e,t,n,r,i){t.isScene!==!0&&(t=ke),Ie.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=F===null?N.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:gt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Re.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(h=N.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=z.get(r),y=k.state.lights;if(we===!0&&(Te===!0||e!==le)){let t=e===le&&r.id===I;Je.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Je.numPlanes||v.numIntersection!==Je.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=k.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=St(r,t,i),P&&r.isNodeMaterial&&P.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(R.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==I&&(I=r.id,C=!0),v.needsLights){let e=Tt(k.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||le!==e){R.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(L,`projectionMatrix`,e.projectionMatrix),T.setValue(L,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(L,De.setFromMatrixPosition(e.matrixWorld)),Pe.logarithmicDepthBuffer&&T.setValue(L,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(L,`isOrthographic`,e.isOrthographicCamera===!0),le!==e&&(le=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(L,`sunShadowMap`,y.state.sunShadowMap,Ie),y.state.directionalShadowMap.length>0&&T.setValue(L,`directionalShadowMap`,y.state.directionalShadowMap,Ie),y.state.spotShadowMap.length>0&&T.setValue(L,`spotShadowMap`,y.state.spotShadowMap,Ie),y.state.pointShadowMap.length>0&&T.setValue(L,`pointShadowMap`,y.state.pointShadowMap,Ie)),i.isSkinnedMesh){T.setOptional(L,i,`bindMatrix`),T.setOptional(L,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(L,`boneTexture`,e.boneTexture,Ie))}i.isBatchedMesh&&(T.setOptional(L,i,`batchingTexture`),T.setValue(L,`batchingTexture`,i._matricesTexture,Ie),T.setOptional(L,i,`batchingIdTexture`),T.setValue(L,`batchingIdTexture`,i._indirectTexture,Ie),T.setOptional(L,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(L,`batchingColorTexture`,i._colorsTexture,Ie));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&$e.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(L,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=ju()),C){if(T.setValue(L,`toneMappingExposure`,N.toneMappingExposure),v.needsLights&&Ot(E,w),a&&r.fog===!0&&We.refreshFogUniforms(E,a),We.refreshMaterialUniforms(E,r,_e,ge,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}ul.upload(L,Ct(v),E,Ie)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(ul.upload(L,Ct(v),E,Ie),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(L,`center`,i.center),T.setValue(L,`modelViewMatrix`,i.modelViewMatrix),T.setValue(L,`normalMatrix`,i.normalMatrix),T.setValue(L,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];it.update(n,x),it.bind(n,x)}}return x}function Ot(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function At(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return se},this.getActiveMipmapLevel=function(){return ce},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(e,t,n){let r=z.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),z.get(e.texture).__webglTexture=t,z.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=z.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){F=e,se=t,ce=n;let r=null,i=!1,a=!1;if(e){let o=z.get(e);if(o.__useDefaultFramebuffer!==void 0){R.bindFramebuffer(L.FRAMEBUFFER,o.__webglFramebuffer),ue.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest,R.viewport(ue),R.scissor(de),R.setScissorTest(fe),I=-1;return}if(o.__webglFramebuffer===void 0)Ie.setupRenderTarget(e);else if(o.__hasExternalTextures)Ie.rebindTextures(e,z.get(e.texture).__webglTexture,z.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&z.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Ie.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=z.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Ie.useMultisampledRTT(e)===!1?z.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ue.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest}else ue.copy(be).multiplyScalar(_e).floor(),de.copy(xe).multiplyScalar(_e).floor(),fe=Se;if(n!==0&&(r=ie),R.bindFramebuffer(L.FRAMEBUFFER,r)&&R.drawBuffers(e,r),R.viewport(ue),R.scissor(de),R.setScissorTest(fe),i){let r=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=z.get(e.textures[t]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,t.__webglTexture,n)}I=-1};function jt(e){let t=z.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Pe.textureFormatReadable(e.format),t.__typeReadable=Pe.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){R.bindFramebuffer(L.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let u=jt(o);if(u.__formatReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&L.readPixels(t,n,r,i,nt.convert(c),nt.convert(l),a)}finally{let e=F===null?null:z.get(F).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){R.bindFramebuffer(L.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let d=jt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.bufferData(L.PIXEL_PACK_BUFFER,a.byteLength,L.STREAM_READ),L.readPixels(t,n,r,i,nt.convert(l),nt.convert(u),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let p=F===null?null:z.get(F).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,p);let m=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Qe(L,m,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,a),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(f),L.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Ie.setTexture2D(e,0),L.copyTexSubImage2D(L.TEXTURE_2D,n,0,0,o,s,i,a),R.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=nt.convert(t.format),_=nt.convert(t.type),v;t.isData3DTexture?(Ie.setTexture3D(t,0),v=L.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Ie.setTexture2DArray(t,0),v=L.TEXTURE_2D_ARRAY):(Ie.setTexture2D(t,0),v=L.TEXTURE_2D),R.activeTexture(L.TEXTURE0),R.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,t.flipY),R.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),R.pixelStorei(L.UNPACK_ALIGNMENT,t.unpackAlignment);let y=R.getParameter(L.UNPACK_ROW_LENGTH),b=R.getParameter(L.UNPACK_IMAGE_HEIGHT),x=R.getParameter(L.UNPACK_SKIP_PIXELS),S=R.getParameter(L.UNPACK_SKIP_ROWS),C=R.getParameter(L.UNPACK_SKIP_IMAGES);R.pixelStorei(L.UNPACK_ROW_LENGTH,h.width),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,h.height),R.pixelStorei(L.UNPACK_SKIP_PIXELS,l),R.pixelStorei(L.UNPACK_SKIP_ROWS,u),R.pixelStorei(L.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=z.get(e),r=z.get(t),h=z.get(n.__renderTarget),g=z.get(r.__renderTarget);R.bindFramebuffer(L.READ_FRAMEBUFFER,h.__webglFramebuffer),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(e).__webglTexture,i,d+n),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(t).__webglTexture,a,m+n)),L.blitFramebuffer(l,u,o,s,f,p,o,s,L.DEPTH_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||z.has(e)){let n=z.get(e),r=z.get(t);R.bindFramebuffer(L.READ_FRAMEBUFFER,ae),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,oe);for(let e=0;e<c;e++)w?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,n.__webglTexture,i),T?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,r.__webglTexture,a),i===0?T?L.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):L.copyTexSubImage2D(v,a,f,p,l,u,o,s):L.blitFramebuffer(l,u,o,s,f,p,o,s,L.COLOR_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?L.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h);R.pixelStorei(L.UNPACK_ROW_LENGTH,y),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,b),R.pixelStorei(L.UNPACK_SKIP_PIXELS,x),R.pixelStorei(L.UNPACK_SKIP_ROWS,S),R.pixelStorei(L.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&L.generateMipmap(v),R.unbindTexture()},this.initRenderTarget=function(e){z.get(e).__webglFramebuffer===void 0&&Ie.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Ie.setTextureCube(e,0):e.isData3DTexture?Ie.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Ie.setTexture2DArray(e,0):Ie.setTexture2D(e,0),R.unbindTexture()},this.resetState=function(){se=0,ce=0,F=null,R.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ue}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=gt._getUnpackColorSpace()}},Nu=Symbol.for(`preact-signals`);function Pu(){if(Bu>1)Bu--;else{var e,t=!1;for((function(){var e=Wu;for(Wu=void 0;e!==void 0;){var t=e.S;if(t.v===e.v)for(var n=t.t;n!==void 0;n=n.x)n.i===e.i&&(n.i=t.i);e=e.o}})();zu!==void 0;){var n=zu;for(zu=void 0,Vu++;n!==void 0;){var r=n.u;if(n.u=void 0,n.f&=-3,!(8&n.f)&&Yu(n))try{n.c()}catch(n){t||=(e=n,!0)}n=r}}if(Vu=0,Bu--,t)throw e}}function Fu(e){if(Bu>0)return e();Uu=++Hu,Bu++;try{return e()}finally{Pu()}}var Iu,Lu=void 0;function Ru(e){var t=Lu,n=Iu;Lu=void 0,Iu=void 0;try{return e()}finally{Lu=t,Iu=n}}var zu=void 0,Bu=0,Vu=0,Hu=0,Uu=0,Wu=void 0,Gu=0;function Ku(e){if(Lu!==void 0){var t=e.n;if(t===void 0||t.t!==Lu)return t={i:0,S:e,p:Lu.s,n:void 0,t:Lu,e:void 0,x:void 0,r:t},Lu.s!==void 0&&(Lu.s.n=t),Lu.s=t,e.n=t,32&Lu.f&&e.S(t),t;if(t.i===-1)return t.i=0,t.n!==void 0&&(t.n.p=t.p,t.p!==void 0&&(t.p.n=t.n),t.p=Lu.s,t.n=void 0,Lu.s.n=t,Lu.s=t),t}}function qu(e,t){this.v=e,this.i=0,this.n=void 0,this.t=void 0,this.l=0,this.W=t?.watched,this.Z=t?.unwatched,this.name=t?.name}qu.prototype.brand=Nu,qu.prototype.h=function(){return!0},qu.prototype.S=function(e){var t=this,n=this.t;n!==e&&e.e===void 0&&(e.x=n,this.t=e,n===void 0?Ru(function(){var e;(e=t.W)==null||e.call(t)}):n.e=e)},qu.prototype.U=function(e){var t=this;if(this.t!==void 0){var n=e.e,r=e.x;n!==void 0&&(n.x=r,e.e=void 0),r!==void 0&&(r.e=n,e.x=void 0),e===this.t&&(this.t=r,r===void 0&&Ru(function(){var e;(e=t.Z)==null||e.call(t)}))}},qu.prototype.subscribe=function(e){var t=this;return id(function(){var n=t.value;Ru(function(){return e(n)})},{name:`sub`})},qu.prototype.valueOf=function(){return this.value},qu.prototype.toString=function(){return this.value+``},qu.prototype.toJSON=function(){return this.value},qu.prototype.peek=function(){var e=this;return Ru(function(){return e.value})},Object.defineProperty(qu.prototype,"value",{get:function(){var e=Ku(this);return e!==void 0&&(e.i=this.i),this.v},set:function(e){if(e!==this.v){if(Vu>100)throw Error(`Cycle detected`);(function(e){Bu!==0&&Vu===0&&e.l!==Uu&&(e.l=Uu,Wu={S:e,v:e.v,i:e.i,o:Wu})})(this),this.v=e,this.i++,Gu++,Bu++;try{for(var t=this.t;t!==void 0;t=t.x)t.t.N()}finally{Pu()}}}});function Ju(e,t){return new qu(e,t)}function Yu(e){for(var t=e.s;t!==void 0;t=t.n)if(t.S.i!==t.i||!t.S.h()||t.S.i!==t.i)return!0;return!1}function Xu(e){for(var t=e.s;t!==void 0;t=t.n){var n=t.S.n;if(n!==void 0&&(t.r=n),t.S.n=t,t.i=-1,t.n===void 0){e.s=t;break}}}function Zu(e){for(var t=e.s,n=void 0;t!==void 0;){var r=t.p;t.i===-1?(t.S.U(t),r!==void 0&&(r.n=t.n),t.n!==void 0&&(t.n.p=r)):n=t,t.S.n=t.r,t.r!==void 0&&(t.r=void 0),t=r}e.s=n}function Qu(e,t){qu.call(this,void 0,t),this.x=e,this.s=void 0,this.g=Gu-1,this.f=4}Qu.prototype=new qu,Qu.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Gu))return!0;if(this.g=Gu,this.f|=1,this.i>0&&!Yu(this))return this.f&=-2,!0;var e=Lu;try{Xu(this),Lu=this;var t=this.x();(16&this.f||this.v!==t||this.i===0)&&(this.v=t,this.f&=-17,this.i++)}catch(e){this.v=e,this.f|=16,this.i++}return Lu=e,Zu(this),this.f&=-2,!0},Qu.prototype.S=function(e){if(this.t===void 0){this.f|=36;for(var t=this.s;t!==void 0;t=t.n)t.S.S(t)}qu.prototype.S.call(this,e)},Qu.prototype.U=function(e){if(this.t!==void 0&&(qu.prototype.U.call(this,e),this.t===void 0)){this.f&=-33;for(var t=this.s;t!==void 0;t=t.n)t.S.U(t)}},Qu.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var e=this.t;e!==void 0;e=e.x)e.t.N()}},Object.defineProperty(Qu.prototype,"value",{get:function(){if(1&this.f)throw Error(`Cycle detected`);var e=Ku(this);if(this.h(),e!==void 0&&(e.i=this.i),16&this.f)throw this.v;return this.v}});function $u(e,t){return new Qu(e,t)}function ed(e){var t=e.m;if(e.m=void 0,typeof t==`function`){Bu++;var n=Lu;Lu=void 0;try{t()}catch(t){throw e.f&=-2,e.f|=8,td(e),t}finally{Lu=n,Pu()}}}function td(e){for(var t=e.s;t!==void 0;t=t.n)t.S.U(t);e.x=void 0,e.s=void 0,ed(e)}function nd(e){if(Lu!==this)throw Error(`Out-of-order effect`);Zu(this),Lu=e,this.f&=-2,8&this.f&&td(this),Pu()}function rd(e,t){this.x=e,this.m=void 0,this.s=void 0,this.u=void 0,this.f=32,this.name=t?.name,Iu&&Iu.push(this)}rd.prototype.c=function(){var e=this.S();try{if(8&this.f||this.x===void 0)return;var t=this.x();typeof t==`function`&&(this.m=t)}finally{e()}},rd.prototype.S=function(){if(1&this.f)throw Error(`Cycle detected`);this.f|=1,this.f&=-9,ed(this),Xu(this),Bu++;var e=Lu;return Lu=this,nd.bind(this,e)},rd.prototype.N=function(){2&this.f||(this.f|=2,this.u=zu,zu=this)},rd.prototype.d=function(){this.f|=8,1&this.f||td(this)},rd.prototype.dispose=function(){this.d()};function id(e,t){var n=new rd(e,t);try{n.c()}catch(e){throw n.d(),e}var r=n.d.bind(n);return r[Symbol.dispose]=r,r}var ad=[`preset:feel`,`preset:juice`,`preset:visual`,`preset:hud`,`scenario`,`user`],od=class{registry;path;type;def;meta;sig;source;constructor(e,t,n,r,i){this.registry=e,this.path=t,this.type=n,this.def=r,this.meta=i,this.sig=Ju(r),this.source=Ju(`default`)}get value(){return this.sig.value}set(e,t=`user`){this.registry.set(this.path,e,t)}get modified(){return!ud(this.sig.value,this.def)}get risky(){let e=this.sig.value;if(typeof e!=`number`)return!1;let{min:t,max:n}=this.meta;return t!==void 0&&e<t||n!==void 0&&e>n}coerce(e){return pd(this.type,this.meta,e)}},sd=class{vars=new Map;layers=new Map(ad.map(e=>[e,new Map]));listeners=new Set;watches=new Map;history=new ld(this);version=Ju(0);num(e,t,n={}){return this.define(e,`num`,t,n)}int(e,t,n={}){return this.define(e,`int`,t,{step:1,...n})}bool(e,t,n={}){return this.define(e,`bool`,t,n)}enum(e,t,n,r={}){return this.define(e,`enum`,t,{...r,options:n})}color(e,t,n={}){return this.define(e,`color`,t,n)}vec3(e,t,n={}){return this.define(e,`vec3`,t,n)}str(e,t,n={}){return this.define(e,`str`,t,n)}define(e,t,n,r){let i=this.vars.get(e);if(i){if(i.type!==t)throw Error(`var ${e} redefined as ${t} (was ${i.type})`);return i.def=n,i.meta=r,this.resolve(i),i}let a=new od(this,e,t,n,r);return this.vars.set(e,a),this.resolve(a),this.version.value++,a}watch(e,t,n={}){this.watches.set(e,{path:e,read:t,meta:n}),this.version.value++}get(e){return this.vars.get(e)}list(){return[...this.vars.values()]}layerValue(e,t){return this.layers.get(e).get(t)}set(e,t,n=`user`){let r=this.vars.get(e),i=r?r.coerce(t):t;i!==void 0&&this.change([{layer:n,path:e,before:this.layerValue(n,e),after:i}])}unset(e,t=`user`){let n=this.layerValue(t,e);n!==void 0&&this.change([{layer:t,path:e,before:n,after:void 0}])}setLayer(e,t){let n=this.layers.get(e),r=[];for(let[i,a]of n)i in t||r.push({layer:e,path:i,before:a,after:void 0});for(let[i,a]of Object.entries(t))r.push({layer:e,path:i,before:n.get(i),after:a});this.change(r)}snapshot(){let e={};for(let[t,n]of this.layers)n.size&&(e[t]=Object.fromEntries(n));return e}restore(e,t=!0){let n=[];for(let t of ad){let r=this.layers.get(t),i=e[t]??{};for(let[e,a]of r)e in i||n.push({layer:t,path:e,before:a,after:void 0});for(let[e,a]of Object.entries(i))n.push({layer:t,path:e,before:r.get(e),after:a})}this.change(n,t)}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}change(e,t=!0){let n=e.filter(e=>!ud(e.before,e.after));if(n.length){Fu(()=>{let e=new Set;for(let t of n){let n=this.layers.get(t.layer);t.after===void 0?n.delete(t.path):n.set(t.path,t.after),e.add(t.path)}for(let t of e){let e=this.vars.get(t);e&&this.resolve(e)}}),t&&this.history.push(n);for(let e of this.listeners)e(n)}}resolve(e){for(let t=ad.length-1;t>=0;t--){let n=this.layers.get(ad[t]).get(e.path);if(n===void 0)continue;let r=e.coerce(n);if(r!==void 0){this.assign(e,r,ad[t]);return}}this.assign(e,e.def,`default`)}assign(e,t,n){ud(e.sig.peek(),t)||(e.sig.value=t),e.source.value=n}},cd=500,ld=class{registry;limit;undoStack=[];redoStack=[];canUndo=Ju(!1);canRedo=Ju(!1);constructor(e,t=500){this.registry=e,this.limit=t}push(e,t=Date.now()){let n=this.undoStack.at(-1);n&&e.length===1&&n.changes.length===1&&n.changes[0].path===e[0].path&&n.changes[0].layer===e[0].layer&&t-n.time<cd?(n.changes[0]={...n.changes[0],after:e[0].after},n.time=t):(this.undoStack.push({changes:e,time:t}),this.undoStack.length>this.limit&&this.undoStack.shift()),this.redoStack=[],this.sync()}undo(){let e=this.undoStack.pop();e&&(this.registry.change(e.changes.map(e=>({...e,before:e.after,after:e.before})).reverse(),!1),this.redoStack.push(e),this.sync())}redo(){let e=this.redoStack.pop();e&&(this.registry.change(e.changes,!1),this.undoStack.push({...e,time:0}),this.sync())}clear(){this.undoStack=[],this.redoStack=[],this.sync()}sync(){this.canUndo.value=this.undoStack.length>0,this.canRedo.value=this.redoStack.length>0}};function ud(e,t){return e===t?!0:Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((e,n)=>e===t[n]):!1}var dd=e=>typeof e==`number`&&Number.isFinite(e);function fd(e,{hardMin:t=-1/0,hardMax:n=1/0}){return Math.min(n,Math.max(t,e))}function pd(e,t,n){switch(e){case`num`:return dd(n)?fd(n,t):void 0;case`int`:return dd(n)?Math.round(fd(n,t)):void 0;case`bool`:return typeof n==`boolean`?n:void 0;case`enum`:return t.options?.includes(n)?n:void 0;case`color`:return typeof n==`string`&&/^#[0-9a-f]{6}$/i.test(n)?n.toLowerCase():void 0;case`vec3`:return Array.isArray(n)&&n.length===3&&n.every(dd)?[...n]:void 0;case`str`:return typeof n==`string`?n:void 0}}var X=new sd,md=e(((e,t)=>{var n=(function(){var e=String.fromCharCode,t=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`,n=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$`,r={};function i(e,t){if(!r[e]){r[e]={};for(var n=0;n<e.length;n++)r[e][e.charAt(n)]=n}return r[e][t]}var a={compressToBase64:function(e){if(e==null)return``;var n=a._compress(e,6,function(e){return t.charAt(e)});switch(n.length%4){default:case 0:return n;case 1:return n+`===`;case 2:return n+`==`;case 3:return n+`=`}},decompressFromBase64:function(e){return e==null?``:e==``?null:a._decompress(e.length,32,function(n){return i(t,e.charAt(n))})},compressToUTF16:function(t){return t==null?``:a._compress(t,15,function(t){return e(t+32)})+` `},decompressFromUTF16:function(e){return e==null?``:e==``?null:a._decompress(e.length,16384,function(t){return e.charCodeAt(t)-32})},compressToUint8Array:function(e){for(var t=a.compress(e),n=new Uint8Array(t.length*2),r=0,i=t.length;r<i;r++){var o=t.charCodeAt(r);n[r*2]=o>>>8,n[r*2+1]=o%256}return n},decompressFromUint8Array:function(t){if(t==null)return a.decompress(t);for(var n=Array(t.length/2),r=0,i=n.length;r<i;r++)n[r]=t[r*2]*256+t[r*2+1];var o=[];return n.forEach(function(t){o.push(e(t))}),a.decompress(o.join(``))},compressToEncodedURIComponent:function(e){return e==null?``:a._compress(e,6,function(e){return n.charAt(e)})},decompressFromEncodedURIComponent:function(e){return e==null?``:e==``?null:(e=e.replace(/ /g,`+`),a._decompress(e.length,32,function(t){return i(n,e.charAt(t))}))},compress:function(t){return a._compress(t,16,function(t){return e(t)})},_compress:function(e,t,n){if(e==null)return``;for(var r,i,a={},o={},s=``,c=``,l=``,u=2,d=3,f=2,p=[],m=0,h=0,g=0;g<e.length;g+=1)if(s=e.charAt(g),Object.prototype.hasOwnProperty.call(a,s)||(a[s]=d++,o[s]=!0),c=l+s,Object.prototype.hasOwnProperty.call(a,c))l=c;else{if(Object.prototype.hasOwnProperty.call(o,l)){if(l.charCodeAt(0)<256){for(r=0;r<f;r++)m<<=1,h==t-1?(h=0,p.push(n(m)),m=0):h++;for(i=l.charCodeAt(0),r=0;r<8;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}else{for(i=1,r=0;r<f;r++)m=m<<1|i,h==t-1?(h=0,p.push(n(m)),m=0):h++,i=0;for(i=l.charCodeAt(0),r=0;r<16;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}u--,u==0&&(u=2**f,f++),delete o[l]}else for(i=a[l],r=0;r<f;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1;u--,u==0&&(u=2**f,f++),a[c]=d++,l=String(s)}if(l!==``){if(Object.prototype.hasOwnProperty.call(o,l)){if(l.charCodeAt(0)<256){for(r=0;r<f;r++)m<<=1,h==t-1?(h=0,p.push(n(m)),m=0):h++;for(i=l.charCodeAt(0),r=0;r<8;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}else{for(i=1,r=0;r<f;r++)m=m<<1|i,h==t-1?(h=0,p.push(n(m)),m=0):h++,i=0;for(i=l.charCodeAt(0),r=0;r<16;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1}u--,u==0&&(u=2**f,f++),delete o[l]}else for(i=a[l],r=0;r<f;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1;u--,u==0&&(u=2**f,f++)}for(i=2,r=0;r<f;r++)m=m<<1|i&1,h==t-1?(h=0,p.push(n(m)),m=0):h++,i>>=1;for(;;){if(m<<=1,h==t-1){p.push(n(m));break}h++}return p.join(``)},decompress:function(e){return e==null?``:e==``?null:a._decompress(e.length,32768,function(t){return e.charCodeAt(t)})},_decompress:function(t,n,r){var i=[],a=4,o=4,s=3,c=``,l=[],u,d,f,p,m,h,g,_={val:r(0),position:n,index:1};for(u=0;u<3;u+=1)i[u]=u;for(f=0,m=4,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=+(p>0)*h,h<<=1;switch(f){case 0:for(f=0,m=256,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=+(p>0)*h,h<<=1;g=e(f);break;case 1:for(f=0,m=2**16,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=+(p>0)*h,h<<=1;g=e(f);break;case 2:return``}for(i[3]=g,d=g,l.push(g);;){if(_.index>t)return``;for(f=0,m=2**s,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=+(p>0)*h,h<<=1;switch(g=f){case 0:for(f=0,m=256,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=+(p>0)*h,h<<=1;i[o++]=e(f),g=o-1,a--;break;case 1:for(f=0,m=2**16,h=1;h!=m;)p=_.val&_.position,_.position>>=1,_.position==0&&(_.position=n,_.val=r(_.index++)),f|=+(p>0)*h,h<<=1;i[o++]=e(f),g=o-1,a--;break;case 2:return l.join(``)}if(a==0&&(a=2**s,s++),i[g])c=i[g];else if(g===o)c=d+d.charAt(0);else return null;l.push(c),i[o++]=d+c.charAt(0),a--,d=c,a==0&&(a=2**s,s++)}}};return a})();typeof define==`function`&&define.amd?define(function(){return n}):t!==void 0&&t!=null?t.exports=n:typeof angular<`u`&&angular!=null&&angular.module(`LZString`,[]).factory(`LZString`,function(){return n})}))(),hd=`kocmoc.layers`,gd=`#s=`;function _d(e){if(!e||typeof e!=`object`||Array.isArray(e))return;let t={};for(let n of ad){let r=e[n];r&&typeof r==`object`&&!Array.isArray(r)&&(t[n]={...r})}return t}function vd(e){let t=new URL(location.href);return t.hash=gd.slice(1)+(0,md.compressToEncodedURIComponent)(JSON.stringify(e.snapshot())),t.toString()}function yd(e){let t;if(location.hash.startsWith(gd)){try{t=_d(JSON.parse((0,md.decompressFromEncodedURIComponent)(location.hash.slice(3))??``))}catch{console.warn(`kocmoc: invalid shared state in URL`)}history.replaceState(null,``,location.pathname+location.search)}if(!t)try{t=_d(JSON.parse(localStorage.getItem(hd)??`null`))}catch{console.warn(`kocmoc: invalid autosave, ignoring`)}t&&e.restore(t,!1);let n;e.onChange(()=>{clearTimeout(n),n=setTimeout(()=>localStorage.setItem(hd,JSON.stringify(e.snapshot())),300)})}function bd(e){let t=e.target;return t?t.isContentEditable||t.tagName===`TEXTAREA`?!0:t.tagName===`INPUT`&&[`text`,`search`,`number`].includes(t.type):!1}var xd=class{step;maxSteps;acc=0;time=0;ticks=0;constructor(e,t=8){this.step=e,this.maxSteps=t}reset(){this.acc=0}advance(e,t){this.acc+=Math.max(0,e);let n=0;for(;this.acc>=this.step&&n<this.maxSteps;)t(this.step),this.acc-=this.step,this.time+=this.step,this.ticks++,n++;return n===this.maxSteps&&this.acc>=this.step&&(this.acc%=this.step),this.acc/this.step}},Sd=()=>({pitch:0,yaw:0,roll:0,strafe:0,lift:0,thrust:0,boost:!1}),Cd=()=>({pos:new W,vel:new W,quat:new lt,angVel:new W,energy:1,boosting:!1,boostLocked:!1});function wd(e,t){return e.pos.copy(t.pos),e.vel.copy(t.vel),e.quat.copy(t.quat),e.angVel.copy(t.angVel),e.energy=t.energy,e.boosting=t.boosting,e.boostLocked=t.boostLocked,e}var Td=e=>Math.min(Math.max(e,-1),1),Ed=(e,t)=>1-Math.exp(-Math.max(e,0)*t),Dd=new W,Od=new lt,kd=new W,Ad=new W,jd=new lt,Md=new W;function Nd(e,t,n,r){Dd.set(Td(t.pitch)*n.turnRate[0],-Td(t.yaw)*n.turnRate[1],-Td(t.roll)*n.turnRate[2]),e.angVel.lerp(Dd,Ed(n.turnResponse,r));let i=e.angVel.length()*r;i>0&&(Od.setFromAxisAngle(kd.copy(e.angVel).normalize(),i),e.quat.multiply(Od).normalize()),t.boost||(e.boostLocked=!1),e.boosting=t.boost&&!e.boostLocked&&e.energy>0,e.energy=Math.min(1,Math.max(0,e.energy+(e.boosting?-n.boostDrain:n.boostRegen)*r)),e.boosting&&e.energy===0&&(e.boostLocked=!0);let a=Td(t.thrust),o=e.boosting?n.boostThrust:a>=0?a*n.thrust:a*n.reverse,s=e.vel.length();if(Ad.set(Td(t.strafe)*n.strafe,Td(t.lift)*n.strafe,-o).applyQuaternion(e.quat),e.vel.addScaledVector(Ad,r),n.assist){Md.copy(e.vel).applyQuaternion(jd.copy(e.quat).invert());let i=Ed(n.assistDamp,r);t.strafe===0&&(Md.x-=Md.x*i),t.lift===0&&(Md.y-=Md.y*i),a===0&&!e.boosting&&Md.z>0&&(Md.z-=Md.z*i),e.vel.copy(Md.applyQuaternion(e.quat))}let c=e.boosting?n.boostSpeed:n.maxSpeed,l=e.vel.length(),u=Math.max(c,c+(s-c)*(1-Ed(n.overspeedDecay,r)));l>u&&e.vel.multiplyScalar(u/l),e.pos.addScaledVector(e.vel,r)}function Pd(e,t,n,r){return e.pos.lerpVectors(t.pos,n.pos,r),e.vel.lerpVectors(t.vel,n.vel,r),e.quat.slerpQuaternions(t.quat,n.quat,r),e.angVel.lerpVectors(t.angVel,n.angVel,r),e.energy=t.energy+(n.energy-t.energy)*r,e.boosting=n.boosting,e.boostLocked=n.boostLocked,e}function Fd(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var Id=[`loop`,`figure8`,`trefoil`,`star`,`coil`,`upright`,`clover`,`tangle`,`stunt`],Ld={loop:4,figure8:12,trefoil:24,star:30,coil:40,upright:10,clover:18,tangle:30,stunt:180};function Rd(e,t,n,r,i=new W){let a=(e,r,a)=>{let o=n*a,s=n*(1-a)+o*Math.cos(r*t);return i.set(s*Math.cos(e*t),o*Math.sin(r*t),s*Math.sin(e*t))};switch(e){case`figure8`:return i.set(n*Math.cos(t),r*Math.sin(t),n*.75*Math.sin(2*t));case`trefoil`:return a(2,3,.42);case`star`:return a(2,5,.36);case`coil`:return a(1,5,.3);case`upright`:return i.set(n*Math.cos(t),n*.75*Math.sin(t),r*Math.sin(2*t));case`clover`:{let e=n*(.62+.38*Math.cos(3*t));return i.set(e*Math.cos(t),r*Math.sin(3*t+.6),e*Math.sin(t))}case`tangle`:{let e=n*(1+.22*Math.sin(3*t+.4));return i.set(e*Math.cos(t),r*1.4*(.7*Math.sin(2*t+1)+.5*Math.sin(5*t)),e*Math.sin(t))}case`stunt`:return Vd(t/(Math.PI*2),n,r,i);default:return i.set(n*Math.cos(t),0,n*Math.sin(t))}}var zd=4,Bd=.1;function Vd(e,t,n,r){let i=n*.8,a=n*.6,o=e=>(e%2==0?.8*i:4*i)/t,s=0;for(let e=0;e<zd;e++)s+=o(e);let c=(Math.PI*2-s)/(1-zd*Bd);e=(e%1+1)%1;let l=e=>e*e*(3-2*e),u=0,d=0,f=0,p=0,m=0;for(let t=0;t<=zd;t++){let n=t<zd?(t+.5)/zd-Bd/2:1;if(e<n){u+=(e-m)*c,p=t===1||t===2?a:0;break}if(u+=(n-m)*c,t===zd)break;let r=Math.min(1,(e-n)/Bd);if(u+=r*o(t),e<n+Bd){let e=Math.PI*2*r;if(t%2==0)d=i*Math.sin(e),f=i*(1-Math.cos(e)),p=t===0?a*l(r):a*(1-l(r));else{let n=i*.7*Math.sin(Math.PI*r)**2;p=(t===1?a:0)+n*Math.sin(e),f=n*(1-Math.cos(e))}break}m=n+Bd}let h=Math.cos(u),g=Math.sin(u);return r.set(t*h-d*g+p*h,f,t*g+d*h+p*g)}var Hd=new W(0,1,0),Ud=new W,Wd=new W;function Gd(e,t,n){let r=Math.cos(n),i=Math.sin(n);Ud.crossVectors(t,e);let a=t.dot(e)*(1-r);return e.multiplyScalar(r).addScaledVector(Ud,i).addScaledVector(t,a)}function Kd(e,t,n,r,i){let a=Ud.subVectors(e[i],e[r]),o=a.dot(a);if(o<1e-12)return n.clone();let s=n.clone().addScaledVector(a,-2/o*a.dot(n)),c=t[r].clone().addScaledVector(a,-2/o*a.dot(t[r])),l=Wd.subVectors(t[i],c),u=l.dot(l);return u<1e-12?s:s.addScaledVector(l,-2/u*l.dot(s))}function qd(e,t){let n=e.length,r=Array(n);r[0]=Hd.clone().addScaledVector(t[0],-Hd.dot(t[0])),r[0].lengthSq()<1e-6&&r[0].set(1,0,0).addScaledVector(t[0],-t[0].x),r[0].normalize();let i=(n,r,i)=>Kd(e,t,n,r,i);for(let e=1;e<n;e++)r[e]=i(r[e-1],e-1,e).normalize();let a=i(r[n-1],n-1,0).normalize(),o=new W().crossVectors(t[0],r[0]),s=Math.atan2(a.dot(o),a.dot(r[0]));for(let e=1;e<n;e++)Gd(r[e],t[e],-s*e/n).normalize();return r}function Jd(e,t,n,r){let i=1/0,a=e.length;for(let o=0;o<a;o++)for(let s=o+1;s<a;s++){if(Math.min(t[s]-t[o],n-(t[s]-t[o]))<r)continue;let a=e[o].distanceToSquared(e[s]);a<i&&(i=a)}return Math.sqrt(i)}function Yd(e,t,n){let r=1/0,i=e.length;for(let a=0;a<i;a++){let o=(a+1)%i,s=o===0?n-t[a]:t[o]-t[a],c=e[a].angleTo(e[o]);c>1e-9&&(r=Math.min(r,s/c))}return r}var Xd=24;function Zd(e){let t=Fd(e.seed),n=e.wobble,r=e.height,i,a=e.shape??`loop`;for(let o=1;o<=Xd;o++){let s=Math.max(Ld[a]??4,Math.round(e.points)),c=[],l=[];for(let i=0;i<s;i++){if(a===`loop`){let a=(i+(t()-.5)*.6)/s*Math.PI*2,o=e.radius*(1+n*(t()*2-1));c.push(new W(Math.cos(a)*o,r*(t()*2-1),Math.sin(a)*o))}else{let o=(i+(t()-.5)*.3)/s*Math.PI*2,l=Math.max(r,e.tubeRadius*6),u=Rd(a,o,e.radius,l),d=a===`stunt`?0:1,f=n*e.radius*.12*d;u.x+=f*(t()*2-1),u.z+=f*(t()*2-1),u.y+=r*.3*d*(t()*2-1),c.push(u)}l.push((t()*2-1)*e.twistNoise)}let u=new Pi(c,!0,`centripetal`);u.arcLengthDivisions=4e3;let d=u.getLength(),f=Math.max(16,Math.round(d/Math.max(e.spacing,.5))),p=[],m=[],h=[];for(let e=0;e<f;e++){let t=e/f;p.push(u.getPointAt(t)),m.push(u.getTangentAt(t).normalize()),h.push(t*d)}let g=qd(p,m),_=[];for(let t=0;t<f;t++){let n=t/f,r=n*s,i=Math.floor(r)%s,a=r-Math.floor(r),o=a*a*(3-2*a),c=Math.round(e.twist)*Math.PI*2*n+l[i]+(l[(i+1)%s]-l[i])*o;Gd(g[t],m[t],c).normalize(),_.push(new W().crossVectors(m[t],g[t]).normalize())}let v=Math.max(1,Math.round(e.checkpoints));i={pos:p,tan:m,up:g,right:_,s:h,length:d,radius:e.tubeRadius,checkpoints:Array.from({length:v},(e,t)=>t*d/v),attempts:o};let y=Jd(p,h,d,e.tubeRadius*4)>e.tubeRadius*2.4,b=Yd(m,h,d)>e.tubeRadius*1.2;if(y&&b)return i;n*=.8,r*=.8}return i}var Qd=new W,$d=new W;function ef(e,t,n,r){let i=e.pos.length,a=e.pos[t],o=e.pos[(t+1)%i];Qd.subVectors(o,a);let s=Qd.lengthSq(),c=s>0?Math.min(1,Math.max(0,$d.subVectors(n,a).dot(Qd)/s)):0,l=$d.copy(a).addScaledVector(Qd,c),u=l.distanceTo(n);if(u<r.dist){r.index=t,r.t=c,r.dist=u,r.point.copy(l);let n=Math.sqrt(s);r.s=(e.s[t]+c*n)%e.length}}function tf(e,t,n=-1,r=24,i){let a=i??{index:0,t:0,s:0,point:new W,dist:1/0};a.dist=1/0;let o=e.pos.length;if(n<0)for(let n=0;n<o;n++)ef(e,n,t,a);else for(let i=-r;i<=r;i++)ef(e,((n+i)%o+o)%o,t,a);return a}var nf=[`shortcut`,`long`,`split`,`hidden`,`shortcut`,`long`],rf={shortcut:.75,long:1.1,split:.8,hidden:.6,pit:.8},af=110,of=e=>{let t=Math.max(0,Math.min(1,e));return t*t*(3-2*t)},sf=e=>Math.sin(Math.PI*e)**2,cf=(e,t)=>of(e/t)*of((1-e)/t),lf=(e,t)=>(e%t+t)%t,uf=(e,t)=>Math.min(e.pos.length-1,Math.floor(lf(t,e.length)/e.length*e.pos.length));function df(e,t,n){let r=e.pos.length,i=uf(e,t),a=(i+1)%r,o=(a===0?e.length:e.s[a])-e.s[i],s=o>0?(lf(t,e.length)-e.s[i])/o:0;return n.lerpVectors(e.pos[i],e.pos[a],s)}function ff(e,t){let n=[0];for(let t=1;t<e.length;t++)n.push(n[t-1]+e[t].distanceTo(e[t-1]));let r=n[n.length-1],i=Math.max(4,Math.round(r/t)),a=[],o=[],s=0;for(let t=0;t<=i;t++){let c=t/i*r;for(;s<e.length-2&&n[s+1]<c;)s++;let l=n[s+1]-n[s],u=l>0?(c-n[s])/l:0;a.push(new W().lerpVectors(e[s],e[s+1],Math.min(1,Math.max(0,u)))),o.push(c)}return{pos:a,s:o,length:r}}function pf(e,t,n,r,i){let a=t.radius,o=Math.max(16,Math.ceil(r/2)),s=e===`pit`?i()<.5?0:Math.PI:i()*Math.PI*2,c=a*rf[e],l=e===`long`?a*(3.5+1.5*i()):e===`split`?(a+c)*1.2:e===`pit`?a*2.3:a*1.5*i(),u=df(t,n,new W),d=df(t,n+r,new W),f=t.tan[uf(t,n)],p=t.tan[uf(t,n+r)],m=u.distanceTo(d),h=[],g=new W;for(let i=0;i<=o;i++){let a=i/o,c=uf(t,n+a*r),_=g.copy(t.right[c]).multiplyScalar(Math.cos(s)).addScaledVector(t.up[c],Math.sin(s)),v=new W;if(e===`shortcut`||e===`hidden`){let e=a*a,t=e*a;v.copy(u).multiplyScalar(2*t-3*e+1).addScaledVector(f,(t-2*e+a)*m).addScaledVector(d,-2*t+3*e).addScaledVector(p,(t-e)*m).addScaledVector(_,sf(a)*l)}else{let i=e===`long`?sf(a):cf(a,e===`pit`?.3:.4);df(t,n+a*r,v).addScaledVector(_,i*l)}h.push(v)}return h}function mf(e,t,n,r,i){let a=t.length/t.pos.length,{pos:o,s,length:c}=ff(pf(e,t,n,r,i),a),l=o.length,u=uf(t,n),d=uf(t,n+r),f=o.map((e,n)=>n===0?t.tan[u].clone():n===l-1?t.tan[d].clone():new W().subVectors(o[n+1],o[n-1]).normalize()),p=[t.up[u].clone().addScaledVector(f[0],-t.up[u].dot(f[0])).normalize()];for(let e=1;e<l;e++)p.push(Kd(o,f,p[e-1],e-1,e).normalize());let m=t.up[d].clone().addScaledVector(f[l-1],-t.up[d].dot(f[l-1])).normalize(),h=new W().crossVectors(f[l-1],p[l-1]),g=Math.atan2(m.dot(h),m.dot(p[l-1]));for(let e=1;e<l;e++)Gd(p[e],f[e],g*e/(l-1)).normalize();let _=f.map((e,t)=>new W().crossVectors(e,p[t]).normalize()),v=t.radius,y=v*rf[e],b=s.map(e=>v+(y-v)*cf(e/c,.25));return{kind:e,s0:n,s1:n+r,pos:o,tan:f,up:p,right:_,s,length:c,rad:b,radius:y,open0:0,open1:c,save:0}}function hf(e){let t=1/0;for(let n=0;n+1<e.pos.length;n++){let r=e.tan[n].angleTo(e.tan[n+1]);r>1e-9&&(t=Math.min(t,(e.s[n+1]-e.s[n])/r))}return t}function gf(e,t){let n=new W,r=new W,i=0;for(let a=0;a<e;a+=4){let o=t(a,n).angleTo(t(a+82,r));i+=Math.min(4,e-a)/(af*Math.max(.4,1-o*.8))}return i}function _f(e,t,n){return n.copy(e.tan[uf(e,t)])}function vf(e,t,n,r){if(n>=t.length)return _f(e,t.s1+(n-t.length),r);let i=Math.min(t.pos.length-1,Math.round(n/t.length*(t.pos.length-1)));return r.copy(t.tan[i])}function yf(e,t){let n=gf(t.s1-t.s0,(n,r)=>_f(e,t.s0+n,r));return 1-gf(t.length,(n,r)=>vf(e,t,n,r))/n}function bf(e,t,n){let r=e.radius;if(hf(t)<e.radius*3)return!1;let i=r*4,a=t.pos.length,o=[];for(let n=0;n<a;n++){let a=t.pos[n],s=t.rad[n],c=1/0,l=1/0;for(let n=0;n<e.pos.length;n++){let r=e.pos[n].distanceToSquared(a);e.s[n]>=t.s0-i&&e.s[n]<=t.s1+i?c=Math.min(c,r):l=Math.min(l,r)}if(Math.sqrt(l)<(r+s)*1.3)return!1;o.push(Math.sqrt(c)>(r+s)*1.06)}let s=o.indexOf(!0),c=o.lastIndexOf(!0);if(s<0)return!1;for(let e=s;e<=c;e++)if(!o[e])return!1;if(t.s[c]-t.s[s]<t.length*.3)return!1;for(let e of n)for(let n=0;n<a;n+=2)for(let r=0;r<e.pos.length;r+=2)if(e.pos[r].distanceTo(t.pos[n])<(e.rad[r]+t.rad[n])*1.3)return!1;return t.open0=t.s[s],t.open1=t.s[c],!0}function xf(e,t,n){switch(e){case`shortcut`:case`hidden`:return t>=n.saveMin&&t<=n.saveMax;case`long`:return-t>=.02&&-t<=n.costMax;case`split`:return Math.abs(t)<=.1;case`pit`:return!0}}var Sf=40;function Cf(e,t,n){let r=Math.max(0,Math.round(t.forks));if(r===0&&!t.pitLane)return e;let i=Fd(t.seed*7919+104729>>>0),a=e.radius,o=e.length,s=[],c=[],l=(e,t)=>e>=a*6&&t<=o-a*6&&c.every(([n,r])=>t<n||e>r),u=(r,o)=>{for(let u=0;u<Sf;u++){let[u,d]=o();if(!l(u-a*3,u+d+a*3)&&r!==`pit`)continue;let f=mf(r,e,u,d,i);if(bf(e,f,s)&&(f.save=yf(e,f),xf(r,f.save,n?{saveMin:t.saveMin*.5,saveMax:t.saveMax*1.5,costMax:t.costMax*1.5}:t))){if(n){let i=n({...e,branches:[...s,f]},f);if(i===null||!xf(r,i,t))continue;f.save=i}return s.push(f),c.push([u-a*3,u+d+a*3]),!0}}return!1};t.pitLane&&u(`pit`,()=>{let e=a*(22+8*i());return[o-a*5-e,e]});let d=i()<.5?0:3;for(let e=0;e<r;e++)for(let t=0;t<3;t++){let n=nf[(d+e+t)%nf.length];if(u(n,()=>{let e=n===`shortcut`||n===`hidden`?o*(.07+.13*i()):n===`long`?o*(.08+.06*i()):a*(16+6*i());return[a*6+i()*Math.max(0,o-a*12-e),e]}))break}if(!s.length)return e;s.sort((e,t)=>e.s0-t.s0);let f=[];for(let[t,n]of e.checkpoints.entries()){let e=s.find(e=>n>=e.s0-a*2&&n<=e.s1+a*2),r=t===0||!e?n:n-(e.s0-a*2)<e.s1+a*2-n?e.s0-a*2:e.s1+a*2;f.every(e=>Math.abs(e-r)>a*4)&&f.push(r)}return f.sort((e,t)=>e-t),{...e,branches:s,checkpoints:f}}var wf=(e,t)=>e.s0+Math.max(0,Math.min(e.length,t))/e.length*(e.s1-e.s0),Tf=()=>({index:0,t:0,s:0,point:new W,dist:1/0}),Ef=new W,Df=new W;function Of(e,t,n=-1,r=16,i=Tf()){i.dist=1/0;let a=e.pos.length-2,o=n<0?0:Math.max(0,n-r),s=n<0?a:Math.min(a,n+r);for(let n=o;n<=s;n++){let r=e.pos[n];Ef.subVectors(e.pos[n+1],r);let a=Ef.lengthSq(),o=a>0?Math.min(1,Math.max(0,Df.subVectors(t,r).dot(Ef)/a)):0,s=Df.copy(r).addScaledVector(Ef,o),c=s.distanceTo(t);c<i.dist&&(i.dist=c,i.index=n,i.t=o,i.point.copy(s),i.s=e.s[n]+o*(e.s[n+1]-e.s[n]))}return i}var kf=(e,t)=>e.rad[t.index]+(e.rad[Math.min(e.rad.length-1,t.index+1)]-e.rad[t.index])*t.t;function Af(e,t){let n=tf(e,t);return{route:-1,main:n,branch:(e.branches??[]).map(()=>({...Tf(),index:-1})),radius:e.radius,s:n.s}}function jf(e,t,n){e.route=-1,tf(t,n,-1,24,e.main);for(let t of e.branch)t.index=-1;e.radius=t.radius,e.s=e.main.s}function Mf(e,t,n,r,i=0){let a=e.branches??[];tf(e,t,n.route>=0?uf(e,n.s):n.main.index,24,n.main);let o=e.radius,s=-1,c=o,l=[],u=[],d=o*4;for(let e=0;e<a.length;e++){let r=a[e],o=n.branch[e];if(!(e===n.route||n.main.s>=r.s0-d&&n.main.s<=r.s1+d)){o.index=-1;continue}Of(r,t,o.index,16,o);let s=kf(r,o);u[e]=o.dist-s,o.dist<=s-i&&l.push(e)}let f=n.main.dist<=o-i;if(n.route<0?f:l.includes(n.route))s=n.route;else if(f||l.length){let e=f?n.main.dist/o:1/0;for(let t of l){let r=n.branch[t].dist/kf(a[t],n.branch[t]);r<e&&(e=r,s=t)}}else{let e=n.main.dist-o;for(let t=0;t<a.length;t++)u[t]!==void 0&&u[t]<e&&(e=u[t],s=t)}if(n.route=s,s<0)r.index=n.main.index,r.t=n.main.t,r.s=n.main.s,r.point.copy(n.main.point),r.dist=n.main.dist;else{let t=a[s],i=n.branch[s];c=kf(t,i),r.s=wf(t,i.s),r.index=uf(e,r.s),r.t=0,r.point.copy(i.point),r.dist=i.dist}n.radius=c,n.s=r.s}function Nf(e,t,n,r,i,a,o,s){let c=n>=0?e.branches?.[n]:void 0;if(c&&t>=c.s0&&t<=c.s1){let e=(t-c.s0)/(c.s1-c.s0)*c.length,n=c.pos.length,l=e/c.length*(n-1),u=Math.min(n-2,Math.floor(l)),d=l-u;return a.lerpVectors(c.pos[u],c.pos[u+1],d).addScaledVector(c.right[u],r).addScaledVector(c.up[u],i),o?.copy(c.tan[u]),s?.copy(c.up[u]),a}let l=uf(e,t);return df(e,t,a).addScaledVector(e.right[l],r).addScaledVector(e.up[l],i),o?.copy(e.tan[l]),s?.copy(e.up[l]),a}function Pf(e,t,n){for(let r of e.branches??[])if(t<=r.s0+r.open0/r.length*(r.s1-r.s0)&&r.s0-t<=n)return r;return null}var Ff=[`hex`,`square`,`rect`,`diamond`,`ellipse`,`triangle`,`octagon`,`star`,`irregular`,`cavern`,`open`],If=Math.PI*2,Lf={hex:1.16,square:1.42,rect:2.06,diamond:1.9,ellipse:1.8,triangle:2,octagon:1.09,star:1.8,irregular:1.55,cavern:3.3,open:3.5},Rf=(e,t,n)=>Array.from({length:e},(r,i)=>zf(t,n+i*If/e)),zf=(e,t)=>[e*Math.cos(t),e*Math.sin(t)],Bf={hex:Rf(6,1/Math.cos(Math.PI/6),0),square:Rf(4,Math.SQRT2,Math.PI/4),octagon:Rf(8,1/Math.cos(Math.PI/8),Math.PI/8),triangle:Rf(3,2,Math.PI/2),rect:[[1.8,1],[-1.8,1],[-1.8,-1],[1.8,-1]],diamond:[[1.9,0],[0,1.3],[-1.9,0],[0,-1.3]],star:Array.from({length:10},(e,t)=>zf(t%2?1.15:1.8,Math.PI/2+t*If/10))};function Vf(e,t){let n=Math.cos(t),r=Math.sin(t),i=1/0;for(let t=0;t<e.length;t++){let[a,o]=e[t],[s,c]=e[(t+1)%e.length],l=s-a,u=c-o,d=n*u-r*l;if(Math.abs(d)<1e-12)continue;let f=(a*u-o*l)/d,p=(a*r-o*n)/d;f>0&&p>=-1e-9&&p<=1+1e-9&&f<i&&(i=f)}return i}function Hf(e){let t=Bf[e.kind];if(!t)return Array.from({length:48},(t,n)=>e.roll+n*If/48);let n=t.map(([e,t])=>Math.atan2(t,e)),r=[],i=Math.max(2,Math.round(48/t.length));return n.forEach((t,a)=>{let o=n[(a+1)%n.length];for(;o<=t;)o+=If;for(let n=0;n<i;n++)r.push(e.roll+t+(o-t)*n/i)}),r}var Uf=new Map;function Wf(e,t,n){let r=Uf.get(e);if(!r){let t=Fd(e);r=[];for(let e=2;e<=5;e++)r.push({amp:(.5+t())/e,phase:t()*If,drift:(t()*2-1)/60});let n=r.reduce((e,t)=>e+t.amp,0);for(let e of r)e.amp/=n;Uf.size>256&&Uf.clear(),Uf.set(e,r)}let i=0;return r.forEach((e,r)=>i+=e.amp*Math.sin((r+2)*t+e.phase+n*e.drift)),i}function Gf(e,t,n){switch(e.kind){case`ellipse`:{let n=1.8,r=t-e.roll;return n/Math.hypot(Math.cos(r),n*Math.sin(r))}case`irregular`:return 1.3+.25*Wf(e.seed,t,n-e.s0);case`cavern`:return 2.6+.7*Wf(e.seed,t,n-e.s0);case`open`:return 1/0;default:return Vf(Bf[e.kind],t-e.roll)}}function Kf(e,t){if(t<=e.s0||t>=e.s1)return 0;let n=Math.min(t-e.s0,e.s1-t),r=Math.min(1,n/Math.max(e.ramp,1e-6));return r*r*(3-2*r)}function qf(e,t){for(let n of e.sections??[])if(t>n.s0&&t<n.s1)return n;return null}function Jf(e,t,n,r={rho:0,open:!1,oob:0}){let i=e.radius;r.rho=i,r.open=!1,r.oob=i;let a=qf(e,t);if(!a)return r;let o=Kf(a,t);return a.kind===`open`?(r.open=o>.5,r.rho=r.open?1/0:i,r.oob=i*(1+(Lf.open-1)*o),r):(r.rho=i*(1+(Gf(a,n,t)-1)*o),r.oob=r.rho,r)}function Yf(e,t){let n=qf(e,t);return e.radius*(n?1+(Lf[n.kind]-1)*Kf(n,t):1)}function Xf(e,t){return e===`rect`||e===`diamond`||e===`ellipse`?t<.5?0:Math.PI/2:Bf[e]?t*If:0}function Zf(e,t){let n=t.kinds.filter(e=>Ff.includes(e));if(t.count<=0||!n.length)return e;let r=Fd(t.seed*31+7),i=e.radius,a=e.length,o=e.pos.length,s=[[a-400,a],[0,300]];for(let t of e.branches??[])s.push([t.s0-2*i-100,t.s1+2*i+100]);let c=(e,t)=>e>=0&&t<=a&&s.every(([n,r])=>t<n||e>r),l=e=>Math.min(o-1,Math.floor(e/a*o)),u=(t,n,r)=>{let s=r+i*1.2,c=Math.max(1,Math.round(i/2/(a/o))),u=e=>e>=t&&e<=n?0:Math.min(Math.abs(e-t),Math.abs(e-n),a-Math.abs(e-t),a-Math.abs(e-n));for(let r=l(t);r<=l(n);r+=c)for(let t=0;t<o;t+=2)if(!(u(e.s[t])<s*2)&&e.pos[r].distanceToSquared(e.pos[t])<s*s)return!1;return!0},d=[],f=0;for(let e=0;e<t.count;e++)placing:for(let e=0;e<n.length;e++){let o=n[(f+e)%n.length],l=i*Lf[o];for(let n=0;n<24;n++){let n=t.minLength+r()*Math.max(0,t.maxLength-t.minLength),p=r()*(a-n),m=p+n;if(c(p,m)&&u(p,m,l)){d.push({kind:o,s0:p,s1:m,ramp:Math.min(n/3,o===`cavern`||o===`open`?i*4:i*1.5),seed:Math.floor(r()*1e9),roll:Xf(o,r())}),s.push([p-i*2,m+i*2]),f+=e+1;break placing}}}return d.length?(d.sort((e,t)=>e.s0-t.s0),{...e,sections:d}):e}var Qf=new W,$f={rho:0,open:!1,oob:0};function ep(e,t,n,r){Qf.subVectors(r,n);let i=Qf.dot(e.right[t]),a=Qf.dot(e.up[t]);return{theta:Math.atan2(a,i),dist:Math.hypot(i,a)}}function tp(e,t,n){let r=.01,i=Jf(e,t,n,$f).rho,a=(Jf(e,t,n+r,$f).rho-Jf(e,t,n-r,$f).rho)/(2*r),o=Math.cos(n),s=Math.sin(n),c=i*o+a*s,l=i*s-a*o,u=Math.hypot(c,l)||1;return[c/u,l/u]}var np=[`ring`,`slalom`,`crusher`,`laser`,`turbine`,`debris`],rp=[`iris`,`shutter`,`turbine`,`crusher`,`laser`,`ring`],ip=(e,t,n)=>e+(t-e)*n,ap=Math.PI*2;function op(e,t,n,r=0){let i=Math.cos(ap*e/t+n);return Math.min(1,Math.max(0,.5+.5*i/Math.max(.05,1-r)))}function sp(e,t){return e.min+(e.max-e.min)*op(t,e.period,e.phase,e.dwell)}function cp(e,t){return e.min+(e.max-e.min)*op(t,e.period,e.phase,e.dwell)}function lp(e,t,n,r,i){switch(e.k){case`hole`:{let a=e.a0+e.omega*r;return Math.hypot(t-e.r*Math.cos(a),n-e.r*Math.sin(a))<=e.gap-i}case`slot`:{let a=t*Math.cos(e.angle)+n*Math.sin(e.angle);return Math.abs(a-e.u0)<=sp(e,r)/2-i}case`iris`:return Math.hypot(t,n)<=cp(e,r)-i;case`beams`:{let a=e.a0+e.omega*r,o=e.width/2+i;for(let r=0;r<(e.crossed?2:1);r++){let i=a+r*Math.PI/2,s=r?e.oy:e.ox,c=t*Math.cos(i)+n*Math.sin(i)-s-e.spacing/2;if(Math.abs(c-Math.round(c/e.spacing)*e.spacing)<o)return!1}return!0}case`blades`:{if(Math.hypot(t,n)<e.hub+i)return!1;let a=e.a0+e.omega*r;for(let r=0;r<e.n;r++){let o=a+ap*r/e.n,s=t*Math.cos(o)+n*Math.sin(o),c=Math.abs(-t*Math.sin(o)+n*Math.cos(o));if(s>0&&c<e.width/2+i)return!1}return!0}}}function up(e,t){switch(e.k){case`hole`:{let n=e.a0+e.omega*t;return[e.r*Math.cos(n),e.r*Math.sin(n)]}case`slot`:return[e.u0*Math.cos(e.angle),e.u0*Math.sin(e.angle)];case`iris`:return[0,0];case`beams`:{let n=e.a0+e.omega*t,r=n+Math.PI/2,i=e.crossed?e.oy:0;return[e.ox*Math.cos(n)+i*Math.cos(r),e.ox*Math.sin(n)+i*Math.sin(r)]}case`blades`:{let n=e.a0+e.omega*t+Math.PI/e.n,r=(e.hub+e.reach)/2;return[r*Math.cos(n),r*Math.sin(n)]}}}function dp(e,t){let n=Fd((t.seed^2654435769)>>>0),r=e.radius,i=t.shipRadius,a=Math.max(1.05,t.minClearance),o=t.kinds.length?t.kinds:[...np],s=Math.max(20,t.chunkLength),c=Math.max(0,t.lead),l=e.length-Math.max(40,s*.5),u=Math.max(0,Math.floor((l-c)/s)),d=[],f=[],p=[],m=[],h=e=>e[Math.floor(n()*e.length)%e.length],g=()=>n()<.5?-1:1,_;for(let e=0;e<u;e++){let l=c+e*s,v=l+s,y=(l+v)/2,b=ip(t.rampStart,t.rampEnd,u>1?e/(u-1):0),x=h(o.length>1?o.filter(e=>e!==_):o);_=x,d.push({kind:x,s0:l,s1:v,difficulty:b});let S=i*ip(Math.max(6,a*2),a,b);switch(x){case`ring`:{let e=Math.min(S*1.3,r*.6),t=(r-e-.5)*ip(.2,1,n()),i=Math.min(ip(.25,1.4,b),ip(3,6,b)/Math.max(t,1));f.push({kind:x,s:y,thickness:1.5,shape:{k:`hole`,r:t,a0:n()*ap,omega:g()*i,gap:e}});break}case`slalom`:{let e=Math.min(S*1.3,r*.6),t=(r-e-.5)*ip(.3,.8,b),i=n()*ap;for(let r=0;r<3;r++)f.push({kind:x,s:l+s*(r+1)/4,thickness:1.2,shape:{k:`hole`,r:t,a0:i,omega:0,gap:e}}),i+=Math.PI*ip(.4,.8,b)*(.8+.2*n());break}case`crusher`:{let e=Math.min(2*S,r),t=n()*Math.PI;for(let i=0;i<2;i++)f.push({kind:x,s:l+s*(i+1)/3,thickness:4,shape:{k:`slot`,angle:t,u0:0,min:e,max:r*1.9,period:ip(4,1.6,b),phase:n()*ap}});break}case`laser`:{let e=.5,t=2*S+e,i=b>.35||n()<.3,a=()=>(n()*2-1)*Math.min(r*.35,Math.max(0,r-S-1));f.push({kind:x,s:y,thickness:.5,shape:{k:`beams`,a0:n()*ap,omega:g()*ip(0,.7,b),spacing:t,width:e,ox:a(),oy:i?a():0,crossed:i,count:Math.ceil(r/t)+2}});break}case`turbine`:{let e=r*.18,t=ip(1.5,3,b),i=(e+r)/2,a=t/2+Math.min(S,i*.9),o=a>=i?2:Math.floor(Math.PI/Math.asin(Math.min(1,a/i))),s=Math.max(2,Math.min(o,Math.round(ip(2,6,b))));f.push({kind:x,s:y,thickness:1.5,shape:{k:`blades`,n:s,hub:e,reach:r,width:t,a0:n()*ap,omega:g()*ip(.4,1.6,b)}});break}case`debris`:{let e=n()*ap,t=n()*r*.5,i=[t*Math.cos(e),t*Math.sin(e)];m.push({s0:l,s1:v,x:i[0],y:i[1]});let a=Math.round(ip(6,30,b)*Math.max(1,(r/22)**2));for(let e=0,t=0;e<a&&t<a*20;t++){let t=ip(1.5,ip(3,6,b),n()),a=n()*ap,o=Math.sqrt(n())*Math.max(0,r-t),s=o*Math.cos(a),c=o*Math.sin(a);Math.hypot(s-i[0],c-i[1])<t+S||(p.push({s:ip(l+10,v-10,n()),x:s,y:c,r:t}),e++)}break}}}return f.sort((e,t)=>e.s-t.s),p.sort((e,t)=>e.s-t.s),{chunks:d,planes:f,rocks:p,lanes:m}}function fp(e,t){let n={chunks:[],planes:[],rocks:[],lanes:[]},r=t.kinds.filter(e=>rp.includes(e));if(t.count<=0||!r.length)return n;let i=Fd(t.seed*2654435761>>>0),a=e.radius,o=e.length,s=Math.min(1,Math.max(0,t.difficulty)),c=t.shipRadius*ip(8,Math.max(1.05,t.minClearance)*1.6,s),l=()=>i()<.5?-1:1,u=t=>t<400||t>o-150||(e.branches??[]).some(e=>t>e.s0-a*3&&t<e.s1+a*3)||(e.sections??[]).some(e=>t>e.s0-a*2&&t<e.s1+a*2)||n.planes.some(e=>Math.abs(e.s-t)<a*4);for(let e=0;e<t.count;e++){let d=r[e%r.length],f=-1;for(let n=0;n<48&&f<0;n++){let r=n<24?(e+.2+i()*.6)/t.count*o:i()*o;u(r)||(f=r)}if(f<0)continue;let p=ip(5,2.6,s)*(.85+.3*i()),m=i()*ap;switch(n.chunks.push({kind:`ring`,s0:f-20,s1:f+20,difficulty:s}),d){case`iris`:n.planes.push({kind:d,s:f,thickness:2,shape:{k:`iris`,min:Math.min(c,a*.5),max:a*.92,period:p,phase:m,dwell:.45,petals:6+Math.floor(i()*4)*2}});break;case`shutter`:{let e=i()*Math.PI,t=Math.min(2*c,a),r=i()<.5;n.planes.push({kind:d,s:f,thickness:3,shape:{k:`slot`,angle:e,u0:0,min:t,max:a*2.05,period:p,phase:m,dwell:.5}}),r&&n.planes.push({kind:d,s:f+3.5,thickness:3,shape:{k:`slot`,angle:e+Math.PI/2,u0:0,min:t,max:a*2.05,period:p,phase:m+.3,dwell:.5}});break}case`crusher`:n.planes.push({kind:d,s:f,thickness:4,shape:{k:`slot`,angle:i()*Math.PI,u0:0,min:Math.min(2*c,a),max:a*1.9,period:p,phase:m}});break;case`turbine`:{let e=a*.18,t=ip(1.5,3,s),r=(e+a)/2,o=t/2+Math.min(c,r*.9),u=o>=r?2:Math.floor(Math.PI/Math.asin(Math.min(1,o/r))),p=Math.max(2,Math.min(u,Math.round(ip(2,5,s))));n.planes.push({kind:d,s:f,thickness:1.5,shape:{k:`blades`,n:p,hub:e,reach:a,width:t,a0:i()*ap,omega:l()*ip(.4,1.4,s)}});break}case`laser`:{let e=.5,t=2*c+e;n.planes.push({kind:d,s:f,thickness:.5,shape:{k:`beams`,a0:i()*ap,omega:l()*ip(0,.6,s),spacing:t,width:e,ox:0,oy:0,crossed:s>.4,count:Math.ceil(a/t)+2}});break}case`ring`:{let e=Math.min(c*1.3,a*.6),t=(a-e-.5)*ip(.2,.9,i()),r=Math.min(ip(.25,1.2,s),ip(3,6,s)/Math.max(t,1));n.planes.push({kind:d,s:f,thickness:1.5,shape:{k:`hole`,r:t,a0:i()*ap,omega:l()*r,gap:e}});break}}}return n.planes.sort((e,t)=>e.s-t.s),n.chunks.sort((e,t)=>e.s0-t.s0),n}function pp(e,t){let n=e.pos.length,r=(t%e.length+e.length)%e.length;return Math.min(n-1,Math.floor(r/e.length*n))}function mp(e,t,n,r,i){let a=pp(e,t),o=e.pos.length,s=(a+1)%o,c=(t%e.length+e.length)%e.length,l=(s===0?e.length:e.s[s])-e.s[a],u=l>0?(c-e.s[a])/l:0;return i.lerpVectors(e.pos[a],e.pos[s],u).addScaledVector(e.right[a],n).addScaledVector(e.up[a],r)}function hp(e,t,n){let r=(e-t)%n;return r>n/2?r-=n:r<=-n/2&&(r+=n),r}var gp=new WeakMap;function _p(e,t){let n=gp.get(e);return n||(n=e.rocks.map(e=>mp(t,e.s,e.x,e.y,new W)),gp.set(e,n)),n}var vp=new W,yp=new W;function bp(e,t,n,r,i,a,o,s){s.impact=0,s.contact=!1,s.nearMiss=!1;let c=n.length,l=r.index,u=n.tan[l];vp.subVectors(t.pos,r.point);let d=vp.dot(n.right[l]),f=vp.dot(n.up[l]);for(let n of e.planes){let e=hp(r.s,n.s,c);if(Math.abs(e)>60)continue;let l=hp(i,n.s,c),p=n.thickness/2+o.shipRadius,m=l<0!=e<0&&Math.abs(l-e)<60;if(!m&&Math.abs(e)>=p)continue;if(lp(n.shape,d,f,a,o.shipRadius)){m&&!lp(n.shape,d,f,a,o.shipRadius+o.nearMiss)&&(s.nearMiss=!0);continue}let h=l===0?-Math.sign(t.vel.dot(u))||-1:Math.sign(l);t.pos.addScaledVector(u,h*p-e);let g=t.vel.dot(u);g*h<0&&(s.impact=Math.max(s.impact,Math.abs(g)),t.vel.addScaledVector(u,-(1+o.bounce)*g)),s.contact=!0,s.point.copy(t.pos).addScaledVector(u,-h*o.shipRadius)}let p=_p(e,n);for(let n=0;n<e.rocks.length;n++){let a=e.rocks[n],l=hp(r.s,a.s,c);if(Math.abs(l)>a.r+o.shipRadius+o.nearMiss+2)continue;let u=p[n],d=t.pos.distanceTo(u),f=a.r+o.shipRadius;if(d<f&&d>1e-6){yp.subVectors(t.pos,u).divideScalar(d),t.pos.copy(u).addScaledVector(yp,f);let e=t.vel.dot(yp);e<0&&(s.impact=Math.max(s.impact,-e),t.vel.addScaledVector(yp,-(1+o.bounce)*e)),s.contact=!0,s.point.copy(u).addScaledVector(yp,a.r)}else d<f+o.nearMiss&&hp(i,a.s,c)<0!=l<0&&(s.nearMiss=!0)}return s}var xp=()=>({impact:0,contact:!1,nearMiss:!1,point:new W});function Sp(e,t){let n=e.kind===`boost`?t-e.depth*.5:(t+Math.max(e.w,0))/2+t*.1;return[n*Math.cos(e.theta),n*Math.sin(e.theta)]}function Cp(e,t,n,r){if(e.kind===`slow`)return t*Math.cos(e.theta)+n*Math.sin(e.theta)<e.w;if(Math.hypot(t,n)<r-e.depth)return!1;let i=Math.atan2(n,t)-e.theta;return i-=Math.round(i/(2*Math.PI))*2*Math.PI,Math.abs(i)<=e.half}function wp(e,t){let n=[];if(!(Math.max(0,t.boosts)+Math.max(0,t.slows)))return n;let r=Fd(t.seed*2246822507+4660>>>0),i=e.radius,a=e.length,o=(r,o)=>r<300||o>a-150||(e.branches??[]).some(e=>o>e.s0-i*3&&r<e.s1+i*3)||(e.sections??[]).some(e=>o>e.s0-i&&r<e.s1+i)||(t.avoid??[]).some(e=>e>r-i*2&&e<o+i*2)||n.some(e=>o>e.s0-i*2&&r<e.s1+i*2),s=[];for(let e=t.boosts,n=t.slows;e>0||n>0;)e>0&&(s.push(`boost`),e--),n>0&&(s.push(`slow`),n--);return s.forEach((e,c)=>{let l=Math.max(10,e===`boost`?t.boostLength:t.slowLength)*(.8+.4*r()),u=-1;for(let e=0;e<48&&u<0;e++){let t=e<24?(c+.2+r()*.6)/s.length*a:r()*a;o(t,t+l)||(u=t)}if(u<0)return;let d=r()*Math.PI*2;n.push({kind:e,s0:u,s1:u+l,theta:d,half:e===`boost`?.3+.1*r():0,depth:e===`boost`?i*.45:0,w:e===`slow`?i*(.2+.15*r()):0})}),n.sort((e,t)=>e.s0-t.s0)}var Tp=Math.PI*2;function Ep(e,t,n={x:0,y:0,vx:0,vy:0,active:!0}){if(e.kind===`slab`){let r=Tp/e.period,i=e.amp*Math.sin(r*t+e.phase),a=e.amp*r*Math.cos(r*t+e.phase),o=Math.cos(e.a),s=Math.sin(e.a);return n.x=i*o-e.off*s,n.y=i*s+e.off*o,n.vx=a*o,n.vy=a*s,n.active=!0,n}let r=((t/e.period+e.phase)%1+1)%1*e.period;if(n.x=e.x,n.vx=0,r<e.hang)n.y=e.top,n.vy=0,n.active=!0;else if(r<e.hang+e.fall){let t=(r-e.hang)/e.fall,i=e.top-e.bottom;n.y=e.top-i*t*t,n.vy=-2*i*t/e.fall,n.active=!0}else n.y=e.bottom,n.vy=0,n.active=!1;return n}function Dp(e,t){let n=[];if(t.perCavern<=0)return n;let r=e.radius,i=r*Math.max(.3,t.core),a=r*1.85;return(e.sections??[]).forEach((e,o)=>{if(e.kind!==`cavern`)return;let s=Fd(t.seed*977+o*131+17>>>0),c=e.s0+e.ramp+r,l=e.s1-e.ramp-r;if(!(l<=c))for(let e=0;e<t.perCavern;e++){let o=c+(e+.25+.5*s())/t.perCavern*(l-c),u=s()<.5?-1:1;if(e%2==0){let e=1.5+s(),t=r*(.35+.2*s()),c=u*(i+e+(a-i-e)*.35*s()),l=Math.sqrt(Math.max(0,a*a-c*c))-t;n.push({kind:`slab`,s:o,a:s()*Tp,off:c,amp:Math.max(0,l),period:5+4*s(),phase:s()*Tp,hw:t,ht:e,hl:r*(.3+.2*s())})}else{let e=2.5+3*s(),t=u*(i+e+(a*.7-i-e)*s()),r=Math.sqrt(Math.max(0,a*a-t*t))-e;n.push({kind:`rock`,s:o,x:t,top:r,bottom:-r,r:e,period:6+4*s(),phase:s(),hang:1.2,fall:1.4})}}}),n.sort((e,t)=>e.s-t.s)}function Op(e,t,n,r,i,a,o){let s=r.index,c=n.radius;kp.subVectors(t.pos,r.point);let l=kp.dot(n.right[s]),u=kp.dot(n.up[s]),d=-1;for(let t=0;t<e.length;t++){let n=e[t];if(!(r.s<n.s0||r.s>n.s1)&&Cp(n,l,u,c)){d=t;break}}let f=o.pad;if(o.pad=d,d<0)return null;let p=e[d];if(p.kind===`boost`){let e=n.tan[s],r=t.vel.dot(e);r<i.speed&&t.vel.addScaledVector(e,Math.min(i.accel*a,i.speed-r))}else t.vel.multiplyScalar(Math.exp(-i.drag*a));return f===d?null:p.kind}var kp=new W,Ap=new W,jp={x:0,y:0,vx:0,vy:0,active:!0};function Mp(e,t,n,r,i,a,o){let s=r.index,c=n.right[s],l=n.up[s],u=n.tan[s],d=0;for(let s of e){let e=hp(r.s,s.s,n.length),f=s.kind===`slab`?s.hl:s.r;if(Math.abs(e)>f+a)continue;let p=Ep(s,i,jp);if(!p.active)continue;kp.subVectors(t.pos,r.point);let m=kp.dot(c)-p.x,h=kp.dot(l)-p.y,g,_,v,y;if(s.kind===`rock`){let t=Math.hypot(m,h,e);if(y=s.r+a-t,y<=0)continue;let n=t>1e-6?1/t:0;[g,_,v]=t>1e-6?[m*n,h*n,e*n]:[0,-1,0]}else{let t=Math.cos(s.a),n=Math.sin(s.a),r=m*t+h*n,i=-m*n+h*t,o=Math.max(-s.hw,Math.min(s.hw,r)),c=Math.max(-s.ht,Math.min(s.ht,i)),l=Math.max(-s.hl,Math.min(s.hl,e)),u=r-o,d=i-c,f=e-l,p=Math.hypot(u,d,f);if(p<1e-6){let t=s.hw-Math.abs(r),n=s.ht-Math.abs(i),o=s.hl-Math.abs(e);n<=t&&n<=o?[u,d,f,p]=[0,Math.sign(i)||1,0,-n]:t<=o?[u,d,f,p]=[Math.sign(r)||1,0,0,-t]:[u,d,f,p]=[0,0,Math.sign(e)||1,-o],y=a-p}else y=a-p,u/=p,d/=p,f/=p;if(y<=0)continue;g=u*t-d*n,_=u*n+d*t,v=f}Ap.copy(c).multiplyScalar(g).addScaledVector(l,_).addScaledVector(u,v),t.pos.addScaledVector(Ap,y);let b=p.vx*g+p.vy*_,x=t.vel.dot(Ap)-b;x<0&&(t.vel.addScaledVector(Ap,-(1+o)*x),d=Math.max(d,-x))}return d}function Np(e){return{timeLeft:e.rules.budget,gates:new Int8Array(e.course.gates.length),beacons:new Uint8Array(e.course.beacons.length),hits:0,misses:0,collected:0,result:null,score:0}}function Pp(e,t){let n=e.result===`clear`?e.timeLeft:0;return Math.round(n*t.scoreTime+e.hits*t.scoreGate+e.collected*t.scoreBeacon)}var Fp=new W,Ip=new W;function Lp(e,t,n,r,i,a,o,s,c,l,u){if(e.result)return;let{course:d,rules:f}=t,p=r.length,m=i.index;Fp.subVectors(n.pos,i.point);let h=Fp.dot(r.right[m]),g=Fp.dot(r.up[m]);for(let t=0;t<d.gates.length;t++){if(e.gates[t]!==0)continue;let n=d.gates[t],r=hp(i.s,n.s,p),o=hp(a,n.s,p);if(Math.abs(o-r)>=60)continue;let c=o<0&&r>=0,m=o>=0&&r<0,_=n.reverse?m:c,v=_&&Math.hypot(h-n.x,g-n.y)<=n.r;n.reverse&&!_&&s-n.s>f.reverseWindow&&(_=!0,v=!1),_&&(e.gates[t]=v?1:-1,v?(e.hits++,l&&(e.timeLeft+=f.gateBonus)):(e.misses++,l&&(e.timeLeft-=f.missPenalty)),u.push({type:`gate`,ok:v,index:t}))}for(let t=0;t<d.beacons.length;t++){if(e.beacons[t])continue;let a=d.beacons[t];Math.abs(hp(i.s,a.s,p))>a.r+o+4||n.pos.distanceTo(mp(r,a.s,a.x,a.y,Ip))>a.r+o||(e.beacons[t]=1,e.collected++,l&&(e.timeLeft+=f.beaconBonus),u.push({type:`beacon`,index:t}))}l&&(e.timeLeft-=c,e.timeLeft<=0&&(e.timeLeft=0,e.result=`timeout`,e.score=Pp(e,f),u.push({type:`timeout`})))}function Rp(e,t){if(!e.result){for(let t=0;t<e.gates.length;t++)e.gates[t]===0&&(e.gates[t]=-1,e.misses++);e.result=`clear`,e.score=Pp(e,t)}}function zp(e,t,n=0){let r=Af(e,t.pos),i={...r.main,point:r.main.point.clone()};return{near:i,loc:r,along:Bp(i.s,e.length),started:!1,lap:0,lapTime:0,raceTime:0,laps:Math.max(0,Math.round(n)),finished:!1,finishTime:null,lapTimes:[],nextCp:1%e.checkpoints.length,splits:[],lastLap:null,bestLap:null,bestSplits:null,contact:!1,wallHits:0,obstacleContact:!1,obstacleHits:0,time:0,events:[],obstacle:xp(),proving:null,oob:0,oobResets:0,zone:{pad:-1}}}var Bp=(e,t)=>e>t/2?e-t:e;function Vp(e,t,n,r){let i=t.pos.length,a=(n%t.length+t.length)%t.length,o=Math.min(i-1,Math.floor(a/t.length*i)),s=(o+1)%i,c=(a-t.s[o])/((s===0?t.length:t.s[s])-t.s[o]);e.pos.lerpVectors(t.pos[o],t.pos[s],c);let l=t.tan[o],u=t.up[o],d=Hp.copy(l).negate(),f=Up.crossVectors(u,d).normalize(),p=Wp.crossVectors(d,f);e.quat.setFromRotationMatrix(Gp.makeBasis(f,p,d)),e.vel.copy(l).multiplyScalar(r),e.angVel.set(0,0,0),e.energy=1,e.boosting=!1,e.boostLocked=!1}var Hp=new W,Up=new W,Wp=new W,Gp=new K,Kp=new W,qp={impact:0};function Jp(e,t,n,r,i,a){a&&(a.impact=0);let o=Math.max(0,n-r.shipRadius);if(t.dist<=o||(Kp.subVectors(e.pos,t.point),Kp.lengthSq()<1e-12))return!1;Kp.normalize(),e.pos.copy(t.point).addScaledVector(Kp,o);let s=e.vel.dot(Kp);return s>0&&(e.vel.addScaledVector(Kp,-(1+r.bounce)*s),a&&(a.impact=s)),e.vel.multiplyScalar(Math.exp(-r.scrape*i)),!0}var Yp={rho:0,open:!1,oob:0},Xp=new W;function Zp(e,t,n,r,i,a){a&&(a.impact=0);let o=t.index,{theta:s}=ep(n,o,t.point,e.pos),c=Jf(n,t.s,s,Yp).rho;if(!Number.isFinite(c))return!1;let[l,u]=tp(n,t.s,s);Kp.copy(n.right[o]).multiplyScalar(l).addScaledVector(n.up[o],u),Xp.copy(t.point).addScaledVector(n.right[o],c*Math.cos(s)).addScaledVector(n.up[o],c*Math.sin(s));let d=Hp.subVectors(e.pos,Xp).dot(Kp)+r.shipRadius;if(d<=0)return!1;e.pos.addScaledVector(Kp,-d);let f=e.vel.dot(Kp);return f>0&&(e.vel.addScaledVector(Kp,-(1+r.bounce)*f),a&&(a.impact=f)),e.vel.multiplyScalar(Math.exp(-r.scrape*i)),!0}function Qp(e,t,n,r,i,a){let o=e.near.s;e.time+=i;let s=a?.proving;s&&!e.proving&&(e.proving=Np(s),e.laps=1);let c=n.branches,l=e.loc.route;c?.length?Mf(n,t.pos,e.loc,e.near,r.shipRadius):tf(n,t.pos,e.near.index,24,e.near);let u=(!c?.length||e.loc.route<0)&&n.sections?qf(n,e.near.s):null,d=u?Jf(n,e.near.s,ep(n,e.near.index,e.near.point,t.pos).theta,Yp):null,f=d?d.oob:e.loc.radius;if(r.open||d?.open){if(e.near.dist>f){if(e.oob===0&&e.events.push({type:`oob`}),e.oob+=i,e.oob>=(r.oobTime??3)){let i=t.energy;Vp(t,n,e.near.s,Math.max(20,t.vel.dot(n.tan[e.near.index]))),t.energy=i,c?.length?(jf(e.loc,n,t.pos),Mf(n,t.pos,e.loc,e.near,r.shipRadius)):tf(n,t.pos,e.near.index,24,e.near),e.oob=0,e.oobResets++,e.proving&&e.started&&!e.finished&&(e.proving.timeLeft-=s.rules.oobPenalty),e.events.push({type:`oobReset`})}}else e.oob=0;e.contact=!1}else{let a=u?Zp(t,e.near,n,r,i,qp):Jp(t,e.near,f,r,i,qp);a&&!e.contact&&(e.wallHits++,e.events.push({type:`hit`,what:`wall`,impact:qp.impact})),e.contact=a}if(c?.length){e.loc.route!==l&&e.events.push({type:`route`,kind:e.loc.route<0?null:c[e.loc.route].kind,branch:e.loc.route});let n=e.loc.route>=0?c[e.loc.route]:null,r=a?.pit;if(n?.kind===`pit`&&r){let a=e.loc.branch[e.loc.route].s;if(a>=n.open0&&a<=n.open1){t.energy=Math.min(1,t.energy+r.refill*i);let e=t.vel.length();e>r.speed&&t.vel.multiplyScalar(Math.max(r.speed/e,Math.exp(-2*i)))}}}let p=!c?.length||e.loc.route<0;if(a?.pads?.list.length){let r=p?Op(a.pads.list,t,n,e.near,a.pads.fx,i,e.zone):(e.zone.pad=-1,null);r&&e.events.push({type:`pad`,kind:r})}if(a?.movers?.length&&p&&u?.kind===`cavern`){let i=Mp(a.movers,t,n,e.near,e.time,r.shipRadius,r.bounce);i>1&&(e.events.push({type:`hit`,what:`obstacle`,impact:i}),e.obstacleHits++,e.obstacle.point.copy(t.pos))}if(a?.gauntlet){let i=bp(a.gauntlet,t,n,e.near,o,e.time,{...r,nearMiss:a.nearMiss},e.obstacle);i.impact>0&&e.events.push({type:`hit`,what:`obstacle`,impact:i.impact}),i.contact&&!e.obstacleContact&&e.obstacleHits++,e.obstacleContact=i.contact,i.nearMiss&&e.events.push({type:`nearMiss`}),i.contact&&tf(n,t.pos,e.near.index,24,e.near)}if(s&&e.proving){let a=e.started&&!e.finished;Lp(e.proving,s,t,n,e.near,o,r.shipRadius,e.along,i,a,e.events),e.proving.result===`timeout`&&!e.finished&&(e.finished=!0,e.finishTime=e.raceTime+i)}let m=e.near.s-o;m>n.length/2?m-=n.length:m<-n.length/2&&(m+=n.length);let h=e.along;if(e.along+=m,e.started&&!e.finished&&(e.lapTime+=i,e.raceTime+=i),!e.started){h<0&&e.along>=0&&(e.started=!0,e.lap=1,e.lapTime=0,e.raceTime=0,e.nextCp=1%n.checkpoints.length,e.events.push({type:`start`}));return}if(e.finished)return;let g=n.checkpoints,_=e.nextCp===0?n.length:g[e.nextCp];e.along>=_&&(e.nextCp===0?(e.lastLap=e.lapTime,e.splits.push(e.lapTime),(e.bestLap===null||e.lapTime<e.bestLap)&&(e.bestLap=e.lapTime,e.bestSplits=[...e.splits]),e.lapTimes.push(e.lapTime),e.lap++,e.lapTime=0,e.splits=[],e.along-=n.length,e.events.push({type:`lap`}),e.laps>0&&e.lap>e.laps&&(e.finished=!0,e.finishTime=e.raceTime,e.proving&&s&&Rp(e.proving,s.rules),e.events.push({type:`finish`}))):(e.splits.push(e.lapTime),e.events.push({type:`checkpoint`})),e.nextCp=(e.nextCp+1)%g.length)}function $p(e,t){return e.started?(e.lap-1)*t+e.along:e.along}function em(e){let t=e.splits.length-1;return t<0||!e.bestSplits||e.bestSplits[t]===void 0?null:e.splits[t]-e.bestSplits[t]}function tm(){return{prev:Cd(),curr:Cd(),race:null,tick:0}}function nm(e,t,n,r=0){let i=e.curr;t?(Vp(i,t,n.s,n.speed),e.race=zp(t,i,r)):(i.pos.set(0,0,0),i.quat.identity(),i.vel.set(0,0,-n.speed),i.angVel.set(0,0,0),i.energy=1,i.boosting=!1,i.boostLocked=!1,e.race=null),wd(e.prev,i),e.tick=0}function rm(e,t,n,r){wd(e.prev,e.curr),Nd(e.curr,t,n.ship,r),e.race&&n.track&&Qp(e.race,e.curr,n.track,n.walls,r,n.course),e.tick++}function im(e,t){let n=t,r=[];for(let t of e){if(n<=0)break;r.push([Math.min(t[0],n),...t.slice(1)]),n-=t[0]}return r}var am=1024,om=[`pitch`,`yaw`,`roll`,`strafe`,`lift`,`thrust`];function sm(e){for(let t of om)e[t]=Math.round(e[t]*am)/am;return e}var cm=class{layers;spawn;step;runs=[];last=null;ticks=0;constructor(e,t,n){this.layers=e,this.spawn=t,this.step=n}push(e){let t=[...om.map(t=>Math.round(e[t]*am)),+!!e.boost],n=this.last;n&&t.every((e,t)=>e===n[t+1])?n[0]++:(this.last=[1,...t],this.runs.push(this.last)),this.ticks++}finish(e={}){return{version:1,layers:JSON.parse(JSON.stringify(this.layers)),spawn:{...this.spawn},step:this.step,inputs:this.runs.map(e=>[...e]),ticks:this.ticks,...e}}},lm=class{rec;run=0;left;tick=0;constructor(e){this.rec=e,this.left=e.inputs[0]?.[0]??0}get done(){return this.tick>=this.rec.ticks}next(e){for(;this.left<=0;){if(this.run++,this.run>=this.rec.inputs.length)return!1;this.left=this.rec.inputs[this.run][0]}let t=this.rec.inputs[this.run];return om.forEach((n,r)=>e[n]=t[r+1]/am),e.boost=t[7]===1,this.left--,this.tick++,!0}};function um(e){if(!e||typeof e!=`object`)return;let t=e;if(t.version!==1||typeof t.step!=`number`||typeof t.ticks!=`number`||!Array.isArray(t.inputs)||!t.inputs.every(e=>Array.isArray(e)&&e.length===8&&e.every(Number.isFinite)))return;let n=t.spawn;if(n&&typeof n.s==`number`&&typeof n.speed==`number`&&t.layers&&typeof t.layers==`object`)return{version:1,layers:t.layers,spawn:{s:n.s,speed:n.speed},step:t.step,inputs:t.inputs,ticks:t.ticks,note:typeof t.note==`string`?t.note:void 0,build:typeof t.build==`string`?t.build:void 0}}var dm=7,fm=e=>Math.round(e*100)/100,pm=e=>Math.round(e*1e4)/1e4,mm=class{every;buf=[];lap=0;nextT=0;constructor(e=1/30){this.every=e}reset(){this.buf=[],this.lap=0,this.nextT=0}update(e,t){if(!e.started)return this.reset(),null;let n=null;if(e.lap!==this.lap&&(this.lap!==0&&e.lastLap!==null&&this.buf.length&&(n={lap:e.lastLap,every:this.every,samples:this.buf}),this.buf=[],this.lap=e.lap,this.nextT=0),e.lapTime>=this.nextT){let e=t.pos,n=t.quat;this.buf.push(fm(e.x),fm(e.y),fm(e.z),pm(n.x),pm(n.y),pm(n.z),pm(n.w)),this.nextT+=this.every}return n}};function hm(e,t,n,r){let i=e.samples.length/dm;if(i===0||t<0)return!1;let a=t/e.every,o=Math.floor(a);if(o>=i-1)return!1;let s=a-o,c=o*dm,l=c+dm,u=e.samples;n.set(u[c]+(u[l]-u[c])*s,u[c+1]+(u[l+1]-u[c+1])*s,u[c+2]+(u[l+2]-u[c+2])*s),r.set(u[c+3],u[c+4],u[c+5],u[c+6]);let d=r.clone();return r.set(u[l+3],u[l+4],u[l+5],u[l+6]),r.slerpQuaternions(d.normalize(),r.normalize(),s),!0}function gm(e){if(!e||typeof e!=`object`)return null;let t=e;return typeof t.lap!=`number`||typeof t.every!=`number`||!Array.isArray(t.samples)||t.samples.length%dm!==0||!t.samples.every(Number.isFinite)?null:{lap:t.lap,every:t.every,samples:t.samples}}var _m=new WeakMap;function vm(e){if(!e)return null;let t=e.pads?.lanes,n=t?.length?bm(e.gauntlet,t):e.gauntlet,r=e.proving?.course;if(!r)return n??null;let i=r,a=_m.get(i);if(!a||n&&a.lanes!==n.lanes){let e=r.gates.filter(e=>!e.reverse).map(e=>({kind:`ring`,s:e.s,thickness:.2,shape:{k:`hole`,r:Math.hypot(e.x,e.y),a0:Math.atan2(e.y,e.x),omega:0,gap:e.r}}));a={planes:[...n?.planes??[],...e].sort((e,t)=>e.s-t.s),lanes:n?.lanes??[]},_m.set(i,a)}return a}var ym=new WeakMap;function bm(e,t){let n=e??ym,r=ym.get(n);r||ym.set(n,r=new WeakMap);let i=r.get(t);return i||(i={planes:e?.planes??[],lanes:[...e?.lanes??[],...t].sort((e,t)=>e.s0-t.s0)},r.set(t,i)),i}var xm=[`main`,`shortcut`,`long`,`random`],Sm={speed:110,obstacleSpeed:55,lookAhead:.5};function Cm(e,t,n){switch(e){case`main`:return!1;case`shortcut`:return t.kind===`shortcut`||t.kind===`hidden`;case`long`:return t.kind===`long`||t.kind===`split`||t.kind===`pit`;case`random`:return(Math.imul(n+1,2654435761)>>>16&1)==1;case`any`:return!0}}function wm(e,t,n,r,i){let a=e.branches;if(!a?.length)return-1;if(r>=0)return n<=a[r].s1?r:-1;for(let e=0;e<a.length;e++){let r=a[e];if(!(n<r.s0||n>r.s1||!Cm(i,r,e))&&t<=r.s0+r.open0/r.length*(r.s1-r.s0)*.9)return e}return-1}var Tm=e=>Math.max(-1,Math.min(1,e)),Em=new lt,Dm=new W,Om=new W,km=new W,Am=new W,jm=new W,Mm=new W,Nm=new W,Pm=new W,Fm=new W,Im=new W;function Lm(e,t,n,r,i,a=null,o=Sm,s=-1){let c=t.length,l=e.vel.length(),u=Math.max(25,Math.min(90,l*o.lookAhead)),d=n.s+u,f=0,p=0,m=o.speed,h=!1,g=0,_=0,v=0,y=0,b=!1;if(a){let i=null,s=1/0;for(let e of a.planes){let t=hp(e.s,n.s,c);t>-.5&&t<u+60&&t<s&&(s=t,i=e)}if(i){let a=Math.max(s,0)/Math.max(l,10);[f,p]=up(i.shape,r+a);let[c,u]=up(i.shape,r+a+.1);_=(c-f)/.1,v=(u-p)/.1,d=i.s+3;let x=pp(t,n.s);Mm.subVectors(e.pos,n.point),g=Mm.dot(t.right[x]),y=Mm.dot(t.up[x]);let S=Math.hypot(f-g,p-y);m=Math.min(m,o.obstacleSpeed*Math.max(.3,1-S/Math.max(s,1))),h=s<30,s<8&&!lp(i.shape,g,y,r+a,1.6)&&(b=!0)}else{let e=a.lanes.find(e=>hp(n.s,e.s0,c)>-80&&hp(n.s,e.s1,c)<0);e&&(f=e.x,p=e.y,e.fast||(m=Math.min(m,o.obstacleSpeed)))}}let x=o.route??`main`,S=wm(t,n.s,d,s,x);S>=0?Nf(t,d,S,0,0,Dm):mp(t,d,h?g:f,h?y:p,Dm),Em.copy(e.quat).invert();let C=Dm.distanceTo(e.pos);Am.subVectors(Dm,e.pos).normalize(),l>5&&!h?jm.copy(e.vel).divideScalar(l):jm.copy(Am),jm.subVectors(Am,jm).multiplyScalar(1.5).add(Am).normalize().multiplyScalar(C),Om.copy(jm).applyQuaternion(Em);let w=Math.max(-Om.z,.001);i.pitch=Tm(Math.atan2(Om.y,w)*3),i.yaw=Tm(Math.atan2(Om.x,w)*3);let T=pp(t,n.s);if(s>=0?Nf(t,n.s,s,0,0,Mm,Fm,km):km.copy(t.up[T]),km.applyQuaternion(Em),i.roll=Tm(Math.atan2(km.x,km.y)*2),h){Om.subVectors(mp(t,d,f,p,Dm),e.pos).applyQuaternion(Em);let r=pp(t,n.s);Pm.copy(t.right[r]).multiplyScalar(_).addScaledVector(t.up[r],v).applyQuaternion(Em),Nm.copy(e.vel).applyQuaternion(Em),i.strafe=Tm(Om.x*.4+(Pm.x-Nm.x)*.4),i.lift=Tm(Om.y*.4+(Pm.y-Nm.y)*.4)}else i.strafe=0,i.lift=0;let E=pp(t,n.s+u*1.5),D=wm(t,n.s,n.s+u*1.5,s,x);D>=0?Nf(t,n.s+u*1.5,D,0,0,Mm,Im):Im.copy(t.tan[E]),s>=0?Nf(t,n.s,s,0,0,Mm,Fm):Fm.copy(t.tan[T]);let O=Fm.angleTo(Im);m*=Math.max(.4,1-O*.8);let ee=l>1e-6?-Nm.copy(e.vel).applyQuaternion(Em).z:0;return i.thrust=Tm(b?(-8-ee)*.3:(m-ee)*.2),i.thrust<0&&!b&&O<.15&&a?.lanes.some(e=>e.fast&&hp(n.s,e.s0,c)>0&&hp(n.s,e.s1,c)<300)&&(i.thrust=0),i.boost=!1,i}var Rm=7,zm=new W;function Bm(e,t){let n=e.samples.length/Rm,r=new Float64Array(n),i=t.length,a=-1,o=0,s=0,c=t.branches?.length?Af(t,zm.fromArray(e.samples,0)):null,l={index:0,t:0,s:0,point:new W,dist:1/0};for(let u=0;u<n;u++){zm.fromArray(e.samples,u*Rm);let n;if(c?(Mf(t,zm,c,l),n=l):n=tf(t,zm,a),a=n.index,u===0)s=n.s>i/2?n.s-i:n.s;else{let e=n.s-o;e>i/2?e-=i:e<-i/2&&(e+=i),s+=e}o=n.s,r[u]=Math.min(i,u>0?Math.max(r[u-1],s):s)}return r}function Vm(e,t,n){return{name:e,ghost:t,profile:Bm(t,n)}}function Hm(e,t){let n=e.profile,r=n.length;if(r===0||t>=n[r-1])return e.ghost.lap;if(t<=n[0])return 0;let i=0,a=r-1;for(;a-i>1;){let e=i+a>>1;n[e]<t?i=e:a=e}let o=n[a]>n[i]?(t-n[i])/(n[a]-n[i]):0;return Math.min(e.ghost.lap,(i+o)*e.ghost.every)}function Um(e,t,n,r){let i=Math.min(r-1,Math.max(0,Math.floor(t/n)));return i*e.ghost.lap+Hm(e,Math.min(t-i*n,n))}function Wm(e,t,n,r,i){let a=e.map(e=>({name:e.name,gap:Um(e,Math.max(0,t),r,i)-n}));return a.sort((e,t)=>e.gap-t.gap),{position:a.filter(e=>e.gap<0).length+1,of:e.length+1,rivals:a}}function*Gm(e,t,n,r=600,i,a=120){let o=e.track;if(!o)return null;let s=tm();nm(s,o,{s:-Math.min(30,o.length*.05),speed:0});let c=new mm,l=Sd(),u=s.race;for(let d=1;d<=r/n;d++){Lm(s.curr,o,u.near,u.time,l,t,i,u.loc.route),rm(s,l,e,n),u.events.length=0;let r=c.update(u,s.curr);if(r)return r;d%a===0&&(yield)}return null}var Km={replayRun:()=>{},saveRepro:e=>{},playRecording:e=>{}};function qm(e){let t=document.createElement(`div`);t.id=`replay-bar`,t.hidden=!0,t.innerHTML=`
    <button class="play" title="Play / pause (B)">⏸</button>
    <input class="scrub" type="range" min="0" max="1" step="1" value="0" />
    <span class="time">0.00 s</span>
    <select class="speed" title="Playback speed">
      <option value="0.25">¼×</option><option value="0.5">½×</option><option value="1" selected>1×</option><option value="2">2×</option><option value="4">4×</option>
    </select>
    <button class="save" title="Download this run as a bug-repro bundle">save repro</button>
    <button class="exit" title="Back to flying">exit replay</button>`,document.body.appendChild(t);let n=e=>t.querySelector(e),r=n(`.play`),i=n(`.scrub`),a=n(`.time`),o=n(`.speed`),s=!1,c=e=>e.currentTarget.blur();return r.addEventListener(`click`,t=>{c(t),e.toggle()}),i.addEventListener(`pointerdown`,()=>s=!0),i.addEventListener(`pointerup`,()=>s=!1),i.addEventListener(`input`,()=>e.seek(Number(i.value))),o.addEventListener(`change`,t=>{c(t),e.speed(Number(o.value))}),n(`.save`).addEventListener(`click`,t=>{c(t),e.save()}),n(`.exit`).addEventListener(`click`,t=>{c(t),e.exit()}),{el:t,update(e){t.hidden=!e.active,e.active&&(r.textContent=e.playing?`⏸`:`⏵`,i.max=String(e.ticks),s||(i.value=String(e.tick)),a.textContent=`${(e.tick*e.step).toFixed(2)} / ${(e.ticks*e.step).toFixed(2)} s`)}}}function Jm(e,t){let n=Math.min(Math.abs(e),1),r=Math.min(Math.max(t.deadzone,0),.99);if(n<=r)return 0;let i=((n-r)/(1-r))**Math.max(t.expo,.01)*t.sensitivity;return Math.sign(e)*Math.min(i,1)}function Ym(e,t,n,r){e.x+=t,e.y+=n;let i=Math.hypot(e.x,e.y);i>r&&(e.x*=r/i,e.y*=r/i)}function Xm(e,t,n){let r=Math.exp(-Math.max(t,0)*n);e.x*=r,e.y*=r}function Zm(e,t){return t>0?{yaw:e.x/t,pitch:-e.y/t}:{yaw:0,pitch:0}}function Qm(e,t,n,r){if(n<=0)return t;let i=t-e,a=n*r;return Math.abs(i)<=a?t:e+Math.sign(i)*a}var $m=[`pitch`,`yaw`,`roll`,`strafe`,`lift`,`thrust`,`none`],eh=[`input`,`touch`],th=[`input`,`touch`,`tilt`],nh={ui:X.enum(`input.touch.ui`,`auto`,[`auto`,`on`,`off`],{tags:eh,desc:`on-screen sticks and buttons; auto = on touch screens`}),radius:X.num(`input.touch.radius`,60,{min:20,max:200,hardMin:1,unit:`px`,tags:eh,desc:`how far a thumb drags for full deflection`}),left:{x:X.enum(`input.touch.left.x`,`strafe`,$m,{tags:eh}),y:X.enum(`input.touch.left.y`,`thrust`,$m,{tags:eh,desc:`drag up = positive`})},right:{x:X.enum(`input.touch.right.x`,`yaw`,$m,{tags:eh}),y:X.enum(`input.touch.right.y`,`pitch`,$m,{tags:eh,desc:`drag up = positive (input.invert.pointerY flips pitch)`})},boostAtRim:X.num(`input.touch.boostAtRim`,.95,{min:.5,max:1.01,hardMin:0,tags:eh,desc:`pushing the thrust stick this far forward boosts; >1 = never`}),tilt:X.bool(`input.tilt.enabled`,!1,{tags:th,desc:`steer by tilting the device (TILT button recalibrates)`}),tiltRange:X.num(`input.tilt.range`,25,{min:5,max:90,hardMin:1,unit:`°`,tags:th,desc:`tilt for full deflection`}),tiltSide:X.enum(`input.tilt.side`,`yaw`,[`yaw`,`roll`,`none`],{tags:th,desc:`what tilting left/right does`}),tiltPitch:X.bool(`input.tilt.pitch`,!0,{tags:th,desc:`tilting the top edge towards you pitches up`}),tiltInvert:X.bool(`input.tilt.invertPitch`,!1,{tags:th})},rh={pitch:0,yaw:0,roll:0,strafe:0,lift:0,thrust:0,boost:!1},ih=Ju(!1),ah=Ju(!1);function oh(){matchMedia(`(pointer: coarse)`).matches&&(ah.value=!0),addEventListener(`touchstart`,()=>ah.value=!0,{once:!0,passive:!0}),id(()=>{let e=nh.ui.value;ih.value=e===`on`||e===`auto`&&ah.value})}function sh(){Object.assign(rh,{pitch:0,yaw:0,roll:0,strafe:0,lift:0,thrust:0,boost:!1})}var ch=e=>Math.min(Math.max(e,-1),1);function lh(e,t,n){if(n<=0)return{x:0,y:0};let r=Math.hypot(e,t),i=r>n?1/r:1/n;return{x:e*i,y:-t*i}}function uh(e){return((e+180)%360+360)%360-180}function dh(e,t,n){let r=Math.PI/180,i=e*r,a=t*r,o=Math.sin(a)*Math.cos(i),s=-Math.sin(i),c=-Math.cos(a)*Math.cos(i),l=n*r;return[o*Math.cos(l)-s*Math.sin(l),o*Math.sin(l)+s*Math.cos(l),c]}function fh(e){let[t,n,r]=e,i=180/Math.PI;return{side:Math.asin(ch(t))*i,pitch:Math.atan2(-n,-r)*i}}function ph(e,t,n){return n<=0?{side:0,pitch:0}:{side:ch(e.side/n),pitch:ch(uh(e.pitch-t)/n)}}var mh=[`input`,`pad`],hh={enabled:X.bool(`input.pad.enabled`,!0,{tags:mh,desc:`read connected gamepads`}),deadzone:X.num(`input.pad.deadzone`,.15,{min:0,max:.5,hardMin:0,hardMax:.95,tags:mh,desc:`radial, per stick; rescaled so motion starts at 0`}),invertPitch:X.bool(`input.invert.padPitch`,!1,{tags:mh,desc:`gamepad: pushing the stick up pitches the nose down`}),menuNav:X.bool(`input.pad.menuNav`,!0,{tags:mh,desc:`D-pad / left stick move between menu buttons, A picks, B closes`})},gh=`input.pad.`,_h={forward:`b7`,back:`b6`,left:`-a2`,right:`+a2`,up:`-a3`,down:`+a3`,pitchUp:`-a1`,pitchDown:`+a1`,yawLeft:`-a0`,yawRight:`+a0`,rollLeft:`b4`,rollRight:`b5`,boost:`b0,b10`,assist:`b1`,camera:`b2`,respawn:`b3`,levels:`b8`,tracks:`b9`,cinematic:`b12`,replay:`b13`,autopilot:`b14`,nextLevel:`b15`};function vh(e){return X.str(`${gh}${e}`,_h[e]??``,{tags:[`input`,`pad`,`keys`],desc:`gamepad: b<n> button, -a<n>/+a<n> axis half; comma-separated`})}var yh=()=>({axes:[],buttons:[]});function bh(e){let t=/^\s*(?:b(\d+)|([+-])a(\d+))\s*$/.exec(e);return t?t[1]===void 0?{kind:`a`,index:Number(t[3]),sign:t[2]===`-`?-1:1}:{kind:`b`,index:Number(t[1])}:null}var xh=e=>e.split(`,`).map(bh).filter(e=>e!==null);function Sh(e,t){let n=t.kind===`b`?e.buttons[t.index]??0:(e.axes[t.index]??0)*t.sign;return Math.min(Math.max(n,0),1)}function Ch(e,t){let n=0;for(let r of xh(t))n=Math.max(n,Sh(e,r));return n}function wh(e,t,n){let r=Math.hypot(e,t),i=Math.min(Math.max(n,0),.95);if(r<=i)return[0,0];let a=Math.min((r-i)/(1-i),1)/r;return[e*a,t*a]}function Th(e,t){let n=e.slice();for(let e=0;e+1<Math.min(n.length,4);e+=2)[n[e],n[e+1]]=wh(n[e],n[e+1],t);for(let e=4;e<n.length;e++)n[e]=wh(n[e],0,t)[0];return n}function Eh(e){let t=yh();for(let n of e)n.axes.forEach((e,n)=>{Math.abs(e)>Math.abs(t.axes[n]??0)?t.axes[n]=e:t.axes[n]??=0}),n.buttons.forEach((e,n)=>t.buttons[n]=Math.max(t.buttons[n]??0,e));return t}var Dh=.5,Oh=.3;function kh(e,t){for(let n=0;n<t.axes.length;n++)for(let r of[1,-1]){let i={kind:`a`,index:n,sign:r};if(Sh(t,i)>Dh&&Sh(e,i)<Oh)return`${r<0?`-`:`+`}a${n}`}for(let n=0;n<t.buttons.length;n++)if((t.buttons[n]??0)>Dh&&(e.buttons[n]??0)<Oh)return`b${n}`;return null}var Ah=(e,t)=>Ch(e,t)>Dh,jh=[`A`,`B`,`X`,`Y`,`LB`,`RB`,`LT`,`RT`,`Back`,`Start`,`L3`,`R3`,`D↑`,`D↓`,`D←`,`D→`,`Home`],Mh={"-a0":`LS ←`,"+a0":`LS →`,"-a1":`LS ↑`,"+a1":`LS ↓`,"-a2":`RS ←`,"+a2":`RS →`,"-a3":`RS ↑`,"+a3":`RS ↓`};function Nh(e){let t=e.trim();if(Mh[t])return Mh[t];let n=bh(t);return n?n.kind===`b`?jh[n.index]??`B${n.index}`:`Axis ${n.index}${n.sign<0?`−`:`+`}`:t}var Ph=e=>e.split(`,`).map(e=>e.trim()).filter(Boolean).map(Nh).join(` / `),Fh=yh(),Ih=yh(),Lh=Ju(``),Rh={on:!1},zh=e=>({axes:Array.from(e.axes),buttons:e.buttons.map(e=>e.value||+!!e.pressed)});function Bh(){let e=typeof navigator<`u`&&navigator.getGamepads?navigator.getGamepads():[],t=Array.from(e).filter(e=>!!e&&e.connected),n=t[0]?.id??``;if(Lh.value!==n&&(Lh.value=n),!hh.enabled.value||!t.length){Fh=Ih=yh();return}Ih=Eh(t.map(zh)),Fh={axes:Th(Ih.axes,hh.deadzone.value),buttons:Ih.buttons}}function Vh(e,t,n){let r=e.x+e.w/2,i=e.y+e.h/2,a=-1,o=1/0;return t.forEach((e,t)=>{let s=e.x+e.w/2-r,c=e.y+e.h/2-i,l=n===`right`?s:n===`left`?-s:n===`down`?c:-c,u=Math.abs(n===`left`||n===`right`?c:s);if(l<=1)return;let d=l+u*2;d<o&&(o=d,a=t)}),a}var Hh={up:`b12,-a1`,down:`b13,+a1`,left:`b14,-a0`,right:`b15,+a0`,ok:`b0`,back:`b1`},Uh=`#levels:not([hidden]) [role=dialog], #tracks:not([hidden]) [role=dialog], #controls [role=dialog]`,Wh=()=>typeof document>`u`?null:document.querySelector(Uh),Gh=.4,Kh=.12,qh={},Jh=e=>{let t=e.getBoundingClientRect();return{x:t.x,y:t.y,w:t.width,h:t.height}},Yh=!1;function Xh(){Yh||(Yh=!0,document.body.classList.add(`pad-nav`),addEventListener(`pointerdown`,()=>(Yh=!1,document.body.classList.remove(`pad-nav`)),{once:!0}))}function Zh(e,t){Xh();let n=Array.from(e.querySelectorAll(`button:not([disabled]), input, select`)).filter(e=>e.offsetParent!==null);if(!n.length)return;let r=document.activeElement instanceof HTMLElement&&e.contains(document.activeElement)?document.activeElement:null;if(!r){(e.querySelector(`button.on:not([disabled])`)??n.find(e=>!e.matches(`.close, .lv-close, .tk-close`))??n[0]).focus();return}let i=n.filter(e=>e!==r),a=Vh(Jh(r),i.map(Jh),t);a>=0&&(i[a].focus(),i[a].scrollIntoView?.({block:`nearest`}))}function Qh(e,t){let n=Wh();if(!n||!hh.menuNav.value){for(let e of Object.keys(qh))delete qh[e];return!!n}for(let r of Object.keys(Hh)){if(!Ah(e,Hh[r])){delete qh[r];continue}let i=qh[r],a=i===void 0;if(i===void 0?qh[r]=0:r!==`ok`&&r!==`back`&&(qh[r]=i+t)>=Gh&&(qh[r]-=Kh,a=!0),a){if(r===`ok`){let e=document.activeElement;e instanceof HTMLElement&&n.contains(e)?e.click():Zh(n,`down`)}else r===`back`?dispatchEvent(new KeyboardEvent(`keydown`,{code:`Escape`,key:`Escape`})):Zh(n,r)}}return!0}var $h=[`pitch`,`yaw`,`roll`,`strafe`,`lift`,`thrust`],eg=()=>({pitch:0,yaw:0,roll:0,strafe:0,lift:0,thrust:0}),tg=[`input`],ng=[`input`,`keys`],rg=(e,t)=>(vh(e),X.str(`input.key.${e}`,t,{tags:ng,desc:`KeyboardEvent.code, comma-separated`})),ig=e=>e.path?X.get(e.path.replace(`input.key.`,gh)):void 0,ag={thrust:[rg(`forward`,`KeyW`),rg(`back`,`KeyS`)],strafe:[rg(`right`,`KeyD`),rg(`left`,`KeyA`)],lift:[rg(`up`,`Space`),rg(`down`,`KeyC`)],roll:[rg(`rollRight`,`KeyE`),rg(`rollLeft`,`KeyQ`)],pitch:[rg(`pitchUp`,`ArrowUp`),rg(`pitchDown`,`ArrowDown`)],yaw:[rg(`yawRight`,`ArrowRight`),rg(`yawLeft`,`ArrowLeft`)]},og=Object.fromEntries($h.map(e=>[e,[ig(ag[e][0]),ig(ag[e][1])]])),sg=rg(`boost`,`ShiftLeft,ShiftRight`),cg=ig(sg),lg=rg(`assist`,`KeyF`),ug=rg(`camera`,`KeyV`),dg=rg(`cinematic`,`KeyX`),fg=rg(`controls`,`KeyK`),pg=rg(`respawn`,`KeyR`),mg=rg(`autopilot`,`KeyP`),hg=rg(`replay`,`KeyB`),gg=rg(`levels`,`KeyL`),_g=rg(`nextLevel`,`KeyN`),vg=rg(`tracks`,`KeyT`),yg=X.num(`input.key.ramp`,8,{min:0,max:30,hardMin:0,unit:`/s`,tags:ng,desc:`how fast key axes move to full; 0 = instant`}),bg={pointer:X.bool(`input.invert.pointerY`,!1,{tags:tg,desc:`touchpad/mouse: moving up pitches the nose down`}),keys:X.bool(`input.invert.keyPitch`,!1,{tags:ng,desc:`swap the pitch up/down keys`}),pad:hh.invertPitch},xg=X.enum(`input.pointer.mode`,`stick`,[`stick`,`scroll`,`off`],{tags:tg,desc:`stick: click to capture, move finger to steer; scroll: two-finger scroll steers`}),Sg=X.num(`input.stick.radius`,200,{min:20,max:800,hardMin:1,unit:`px`,tags:tg}),Cg=X.num(`input.stick.recenter`,1.5,{min:0,max:10,hardMin:0,unit:`/s`,tags:tg,desc:`0 = stick stays where you leave it`}),wg=X.num(`input.scroll.sens`,.01,{min:.001,max:.05,hardMin:0,tags:tg}),Tg=X.num(`input.scroll.decay`,6,{min:0,max:30,hardMin:0,unit:`/s`,tags:tg}),Eg=X.enum(`input.pinch.action`,`throttle`,[`throttle`,`zoom`,`off`],{tags:tg,desc:`ctrl+wheel / trackpad pinch`}),Dg=X.num(`input.pinch.sens`,.01,{min:.001,max:.05,hardMin:0,tags:tg}),Og=X.enum(`input.pointer.click`,`boost`,[`boost`,`thrust`,`none`],{tags:tg,desc:`held click while the stick is captured`}),kg=(e,t)=>({deadzone:X.num(`input.curve.${e}.deadzone`,.05,{min:0,max:.5,hardMin:0,hardMax:.99,tags:[`input`,`curve`,`feel`]}),expo:X.num(`input.curve.${e}.expo`,t,{min:.5,max:4,hardMin:.1,tags:[`input`,`curve`,`feel`]}),sensitivity:X.num(`input.curve.${e}.sens`,1,{min:.1,max:3,hardMin:0,tags:[`input`,`curve`,`feel`]})}),Ag=kg(`move`,1),jg={pitch:kg(`pitch`,1.6),yaw:kg(`yaw`,1.6),roll:kg(`roll`,1.3),strafe:Ag,lift:Ag,thrust:Ag},Mg=e=>({deadzone:jg[e].deadzone.value,expo:jg[e].expo.value,sensitivity:jg[e].sensitivity.value}),Ng=new Set,Pg={x:0,y:0},Fg={yaw:0,pitch:0},Ig=!1,Lg=!1,Rg=0,zg={value:1},Bg={keys:eg(),pointer:eg(),pad:eg(),padActive:!1,raw:eg(),curved:eg(),boost:!1,captured:!1,cruise:0,stick:Pg},Vg=e=>e.value.split(`,`).some(e=>Ng.has(e.trim())),Hg=e=>Math.min(Math.max(e,-1),1),Ug=[];function Wg(e,t){Ug.push({key:e,pad:ig(e),was:!1,fn:t})}var Gg=new Set(Object.values(Hh).flatMap(e=>e.split(`,`))),Kg=!1;function qg(e){if(Bh(),Rh.on){Kg=!0;for(let e of Ug)e.was=!0;return}let t=Qh(Fh,e);Kg=t;for(let e of Ug){if(!e.pad)continue;let n=t?e.pad.value.split(`,`).filter(e=>!Gg.has(e.trim())).join(`,`):e.pad.value;Ah(Fh,n)&&!e.was&&e.fn(),e.was=Ah(Fh,e.pad.value)}}function Jg(e){addEventListener(`keydown`,e=>{if(!(bd(e)||e.ctrlKey||e.metaKey)){if(!e.repeat)for(let t of Ug)t.key.value.split(`,`).some(t=>t.trim()===e.code)&&t.fn();(e.code===`Space`||e.code.startsWith(`Arrow`))&&e.preventDefault(),Ng.add(e.code)}}),addEventListener(`keyup`,e=>Ng.delete(e.code)),addEventListener(`blur`,()=>{Ng.clear(),Ig=!1}),e.addEventListener(`mousedown`,t=>{if(t.button===0){if(xg.value===`stick`&&!Lg){e.requestPointerLock?.();return}Ig=!0}}),addEventListener(`mouseup`,()=>Ig=!1),document.addEventListener(`pointerlockchange`,()=>{Lg=document.pointerLockElement===e,Lg||(Pg.x=Pg.y=0,Ig=!1)}),addEventListener(`mousemove`,e=>{Lg&&xg.value===`stick`&&Ym(Pg,e.movementX,e.movementY,Sg.value)}),e.addEventListener(`wheel`,e=>{e.preventDefault();let t=e.deltaMode===1?16:e.deltaMode===2?400:1;if(e.ctrlKey){let n=-e.deltaY*t*Dg.value;Eg.value===`throttle`?Rg=Math.min(1,Math.max(0,Rg+n)):Eg.value===`zoom`&&(zg.value=Math.min(4,Math.max(.25,zg.value*Math.exp(-n))));return}xg.value===`scroll`&&(Fg.yaw=Hg(Fg.yaw+e.deltaX*t*wg.value),Fg.pitch=Hg(Fg.pitch-e.deltaY*t*wg.value))},{passive:!1});for(let t of[`gesturestart`,`gesturechange`])e.addEventListener(t,e=>e.preventDefault());e.addEventListener(`contextmenu`,e=>e.preventDefault())}function Yg(e,t){let n=Bg.keys;for(let e of $h){let[r,i]=ag[e],a=+!!Vg(r)-!!Vg(i);e===`pitch`&&bg.keys.value&&(a=-a),n[e]=Qm(n[e],a,yg.value,t)}let r=Bg.pointer;if(Object.assign(r,eg()),xg.value===`stick`&&Lg){Xm(Pg,Cg.value,t);let e=Zm(Pg,Sg.value);r.yaw=e.yaw,r.pitch=e.pitch}else if(xg.value===`scroll`){let e=Math.exp(-Tg.value*t);Fg.yaw*=e,Fg.pitch*=e,r.yaw=Fg.yaw,r.pitch=Fg.pitch}bg.pointer.value&&(r.pitch=-r.pitch);for(let e of $h)r[e]=Hg(r[e]+rh[e]);let i=Ig&&(Lg||xg.value!==`stick`);i&&Og.value===`thrust`&&(r.thrust=1),r.thrust=Math.max(r.thrust,Rg);let a=Bg.pad;for(let e of $h){let[t,n]=og[e];a[e]=Kg?0:Ch(Fh,t.value)-Ch(Fh,n.value),e===`pitch`&&bg.pad.value&&(a.pitch=-a.pitch)}Bg.padActive=!Kg&&Fh.axes.length+Fh.buttons.length>0;let o=e;for(let e of $h)Bg.raw[e]=Hg(n[e]+r[e]+a[e]),Bg.curved[e]=Jm(Bg.raw[e],Mg(e)),o[e]=Bg.curved[e];return o.boost=Vg(sg)||i&&Og.value===`boost`||rh.boost||!Kg&&Ah(Fh,cg.value),Bg.boost=o.boost,Bg.captured=Lg,Bg.cruise=Rg,o}var Xg=`input.key.`,Zg={forward:`Thrust`,back:`Reverse`,left:`Strafe left`,right:`Strafe right`,up:`Up`,down:`Down`,pitchUp:`Pitch up`,pitchDown:`Pitch down`,yawLeft:`Yaw left`,yawRight:`Yaw right`,rollLeft:`Roll left`,rollRight:`Roll right`,boost:`Boost`,assist:`Flight assist`,camera:`Cycle camera`,cinematic:`Cinematic camera`,inputViz:`Input visualizer`,controls:`Controls panel`,respawn:`Respawn`,autopilot:`Autopilot`,replay:`Replay run / play-pause`,levels:`Proving levels`,nextLevel:`Next proving level`,tracks:`Race tracks`},Qg=e=>e.slice(10),$g=e=>Zg[Qg(e)]??Qg(e);function e_(e){return e.split(`,`).map(e=>e.trim()).filter(Boolean)}function t_(e,t,n){let r=e_(e);if(n===null)r.splice(t,1);else if(t>=r.length)r.includes(n)||r.push(n);else{let e=r.indexOf(n);e>=0&&(r[e]=r[t]),r[t]=n}return r.join(`,`)}function n_(e){let t=new Map;for(let[n,r]of Object.entries(e))for(let e of new Set(e_(r)))t.set(e,[...t.get(e)??[],n]);for(let[e,n]of t)n.length<2&&t.delete(e);return t}var r_={ArrowUp:`↑`,ArrowDown:`↓`,ArrowLeft:`←`,ArrowRight:`→`,Backquote:"`",Minus:`-`,Equal:`=`,BracketLeft:`[`,BracketRight:`]`,Backslash:`\\`,Semicolon:`;`,Quote:`'`,Comma:`,`,Period:`.`,Slash:`/`};function i_(e){if(r_[e])return r_[e];let t=/^(?:Key|Digit)(.)$/.exec(e);return t?t[1]:(t=/^Numpad(.+)$/.exec(e),t?`Num ${t[1]}`:(t=/^(Shift|Control|Alt|Meta)(Left|Right)$/.exec(e),t?`${t[2][0]} ${t[1]===`Control`?`Ctrl`:t[1]}`:e))}var a_=[`trackside`,`flyby`,`hero`,`drone`,`orbit`,`tail`],o_=[`cam`,`cine`],s_=X.num(`cam.cine.shotMin`,4,{min:.5,max:30,hardMin:.1,unit:`s`,tags:o_,desc:`shortest time before the director cuts`}),c_=X.num(`cam.cine.shotMax`,8,{min:.5,max:60,hardMin:.1,unit:`s`,tags:o_,desc:`longest time before the director cuts`}),l_=X.num(`cam.cine.blend`,0,{min:0,max:4,hardMin:0,unit:`s`,tags:o_,desc:`glide between shots; 0 = hard cut`}),u_=X.str(`cam.cine.shots`,a_.join(`,`),{tags:o_,desc:`shots the director picks from: ${a_.join(`, `)}`}),d_=X.num(`cam.cine.aim`,5,{min:.5,max:30,hardMin:.01,unit:`/s`,tags:o_,desc:`how fast static cameras pan after the ship; lower = lazier operator`}),f_=X.num(`cam.cine.frame`,14,{min:2,max:100,hardMin:.1,unit:`m`,tags:o_,desc:`width kept in frame by the telephoto trackside lens`}),p_=X.num(`cam.cine.flyby`,.75,{min:0,max:1,tags:o_,desc:`share of shots that stand still on the path and let the ship fly past`}),m_=X.num(`cam.cine.lead`,2.5,{min:.5,max:10,hardMin:.1,unit:`s`,tags:o_,desc:`how long until the ship reaches a fly-by camera when the shot starts`}),h_=X.num(`cam.cine.after`,1,{min:0,max:5,hardMin:0,unit:`s`,tags:o_,desc:`how long a fly-by camera watches the ship leave before cutting`}),g_=X.bool(`cam.cine.replay`,!0,{tags:o_,desc:`replays use the cinematic camera`}),__=X.num(`cam.cine.letterbox`,.1,{min:0,max:.25,hardMin:0,hardMax:.45,tags:o_,desc:`black bars, as a share of the screen height (0 = off)`}),v_={track:null,near:null,route:-1},y_=(e=5e3)=>({shot:`drone`,t:0,len:0,rand:Fd(e),side:1,spot:new W,dir:new W(0,0,-1),up:new W(0,1,0),passT:-1,aim:new W,arm:new lt,orbit:0,from:null,started:!1,want:null}),b_={nearMiss:[`tail`,`flyby`],hit:[`tail`,`drone`],lap:[`trackside`,`hero`],route:[`flyby`,`hero`]};function x_(e,t){let n=b_[t]?.filter(t=>t!==e.shot&&S_(u_.value).includes(t));n?.length&&!e.want&&(e.want=n[Math.floor(e.rand()*n.length)])}function S_(e){let t=e.split(`,`).map(e=>e.trim()).filter(e=>a_.includes(e));return t.length?[...new Set(t)]:[...a_]}function C_(e,t,n){let r=t.length>1?t.filter(t=>t!==e):t;return r[Math.min(r.length-1,Math.floor(n()*r.length))]}var w_=e=>e===`flyby`||e===`trackside`;function T_(e,t,n,r){let i=t.filter(w_),a=t.filter(e=>!w_(e));if(!i.length||!a.length)return C_(e,t,n);let o=n()<r?i:a;return C_(e,o.length>1||o[0]!==e?o:t,n)}function E_(e,t,n,r){let i=2*Math.atan(t/2/Math.max(e,.001))*180/Math.PI;return Math.min(r,Math.max(n,i))}var D_=e=>{let t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)},O_=(e,t,n)=>A_.subVectors(t,e).dot(n)>0;function k_(e,t,n,r,i,a){let o=e.length,s=e.pos.length,c=(t%o+o)%o,l=0,u=s-1;for(;l<u;){let t=l+u+1>>1;e.s[t]<=c?l=t:u=t-1}let d=(l+1)%s,f=(d===0?o:e.s[d])-e.s[l],p=f>0?(c-e.s[l])/f:0;n.lerpVectors(e.pos[l],e.pos[d],p),r.lerpVectors(e.right[l],e.right[d],p).normalize(),i.lerpVectors(e.up[l],e.up[d],p).normalize(),a.lerpVectors(e.tan[l],e.tan[d],p).normalize()}var A_=new W,j_=new W,M_=new W,N_=new W,P_=new W,F_=new W,I_=new lt;function L_(e,t,n,r){if(e.shot=t,e.t=0,e.len=s_.value+e.rand()*Math.max(0,c_.value-s_.value),e.side=e.rand()<.5?-1:1,e.arm.copy(n.quat),e.orbit=e.rand()*Math.PI*2,e.aim.copy(n.pos),e.passT=-1,!w_(t))return;let i=n.vel.length(),a=t===`flyby`,o=Math.max(a?30:60,i*m_.value*(a?1:1.6));e.len=o/Math.max(i,1)+h_.value+s_.value;let{track:s,near:c}=r;if(s&&c){let t=r.route??-1,n=t>=0?s.branches?.[t]:void 0,i=s.radius;n&&c.s+o<=n.s1?(Nf(s,c.s+o,t,0,0,j_,P_,N_),M_.crossVectors(P_,N_).normalize(),i=n.radius):k_(s,c.s+o,j_,M_,N_,P_),e.spot.copy(j_).addScaledVector(M_,e.side*i*(a?.42:.45)).addScaledVector(N_,i*(a?-.12:.2))}else i>2?P_.copy(n.vel).divideScalar(i):P_.set(0,0,-1).applyQuaternion(n.quat),N_.set(0,1,0).applyQuaternion(n.quat),M_.crossVectors(P_,N_),M_.lengthSq()<1e-6&&M_.set(1,0,0).applyQuaternion(n.quat),M_.normalize(),N_.crossVectors(M_,P_),e.spot.copy(n.pos).addScaledVector(P_,o).addScaledVector(M_,e.side*(a?7:25)).addScaledVector(N_,a?-1.5:8);e.dir.copy(P_),e.up.copy(N_)}function R_(e,t,n,r,i,a=v_){let o=S_(u_.value);(!r.started||!o.includes(r.shot))&&(L_(r,o.includes(`flyby`)&&p_.value>0?`flyby`:T_(null,o,r.rand,p_.value),t,a),r.started=!0),r.t+=n;let s=w_(r.shot);s&&r.passT<0&&O_(r.spot,t.pos,r.dir)&&(r.passT=r.t);let c=s&&(r.passT>=0&&r.t-r.passT>=h_.value||r.spot.distanceTo(t.pos)>1500),l=r.want!==null&&r.t>=1.5;if(r.t>=r.len||c||l){r.from=l_.value>0&&!c?{pos:e.position.clone(),quat:e.quaternion.clone(),fov:e.fov}:null;let n=l&&o.includes(r.want)?r.want:T_(r.shot,o,r.rand,p_.value);r.want=null,L_(r,n,t,a)}let u=i,d=e=>1-Math.exp(-e*n);switch(r.shot){case`trackside`:case`flyby`:r.aim.lerp(t.pos,d(d_.value*(r.shot===`flyby`?3:1))),e.position.copy(r.spot),e.up.copy(r.up),e.lookAt(r.aim),u=r.shot===`trackside`?E_(r.spot.distanceTo(t.pos),f_.value,8,i):i+10;break;default:{let a={hero:3,drone:1.2,orbit:2,tail:8}[r.shot];r.arm.slerp(t.quat,d(a)),r.shot===`orbit`&&(r.orbit+=.35*n*r.side);let o=r.side;r.shot===`hero`?F_.set(o*3,1.2,-16):r.shot===`drone`?F_.set(o*6,12,32):r.shot===`tail`?F_.set(o*2.2,-.9,5.5):F_.set(Math.sin(r.orbit)*24,5,Math.cos(r.orbit)*24),e.position.copy(t.pos).add(F_.applyQuaternion(r.arm)),e.up.copy(N_.set(0,1,0).applyQuaternion(r.arm));let s=r.shot===`hero`?0:r.shot===`tail`?30:8;e.lookAt(j_.set(0,0,-s).applyQuaternion(t.quat).add(t.pos)),r.shot===`tail`?u=i+15:r.shot===`hero`&&(u=Math.max(20,i-15))}}if(r.from){let t=D_(r.t/l_.value);e.position.lerpVectors(r.from.pos,e.position,t),e.quaternion.copy(I_.slerpQuaternions(r.from.quat,e.quaternion,t)),u=r.from.fov+(u-r.from.fov)*t,t>=1&&(r.from=null)}Math.abs(e.fov-u)>.001&&(e.fov=u,e.updateProjectionMatrix())}var z_=[`chase`,`cockpit`,`far`,`lookback`,`top`,`orbit`,`side`,`cinematic`],B_=[`chase`,`cockpit`,`far`,`lookback`,`cinematic`],V_=X.enum(`cam.mode`,`chase`,z_,{tags:[`cam`],desc:`V cycles chase, cockpit, far, look-back and cinematic; X toggles cinematic`}),H_=[`cam`],U_=X.num(`cam.fov`,70,{min:20,max:120,hardMin:1,hardMax:179,unit:`°`,tags:H_}),W_=X.num(`cam.chase.distance`,9,{min:2,max:40,hardMin:.5,hardMax:900,unit:`m`,tags:H_}),G_=X.num(`cam.chase.height`,2.2,{min:-5,max:10,unit:`m`,tags:H_}),K_=X.num(`cam.chase.lookAhead`,25,{min:0,max:200,hardMin:0,unit:`m`,tags:H_,desc:`aim point in front of the ship`}),q_=X.num(`cam.chase.lag`,7,{min:.5,max:30,hardMin:.01,unit:`/s`,tags:[`cam`,`feel`],desc:`how fast the spring arm catches up with the ship’s rotation; higher = stiffer`}),J_=X.vec3(`cam.cockpit.offset`,[0,.35,-.6],{tags:H_,desc:`eye position in ship space`}),Y_=X.num(`cam.far.distance`,30,{min:5,max:200,hardMin:1,unit:`m`,tags:H_}),X_=X.num(`cam.far.height`,8,{min:-20,max:60,unit:`m`,tags:H_}),Z_=X.num(`cam.top.height`,150,{min:10,max:2e3,hardMin:1,unit:`m`,tags:H_,desc:`tactical view above the ship`}),Q_=X.num(`cam.orbit.distance`,20,{min:3,max:200,hardMin:1,unit:`m`,tags:H_}),$_=X.num(`cam.orbit.speed`,.3,{min:-3,max:3,unit:`rad/s`,tags:H_}),ev=X.num(`cam.side.distance`,40,{min:5,max:400,hardMin:1,unit:`m`,tags:H_,desc:`track-side cinematic: fixed spot the ship flies past`}),tv=()=>({arm:new lt,armInit:!1,orbit:0,spot:new W,spotInit:!1,cine:y_()}),nv=new W,rv=new W,iv=new W,av=new W,ov=tv();function sv(){let e=B_.indexOf(V_.value);V_.set(B_[(e+1)%B_.length])}var cv=`chase`;function lv(){V_.value===`cinematic`?V_.set(cv):(cv=V_.value,V_.set(`cinematic`))}function uv(e,t,n,r,i,a=1){if(e!==`cinematic`)i.cine.started=!1;else{i.armInit=i.spotInit=!1,R_(t,n,r,i.cine,U_.value);return}switch(t.fov!==U_.value&&(t.fov=U_.value,t.updateProjectionMatrix()),e!==`chase`&&e!==`far`&&(i.armInit=!1),e!==`side`&&(i.spotInit=!1),e){case`cockpit`:t.position.copy(nv.fromArray(J_.value).applyQuaternion(n.quat).add(n.pos)),t.quaternion.copy(n.quat);return;case`lookback`:t.position.copy(nv.set(0,1.2,-3).applyQuaternion(n.quat).add(n.pos)),t.up.copy(iv.set(0,1,0).applyQuaternion(n.quat)),t.lookAt(rv.set(0,0,40).applyQuaternion(n.quat).add(n.pos));return;case`top`:t.position.copy(n.pos).add(nv.set(0,Z_.value*a,0)),av.set(0,0,-1).applyQuaternion(n.quat).setY(0),av.lengthSq()<1e-6&&av.set(0,0,-1),t.up.copy(av.normalize()),t.lookAt(n.pos);return;case`orbit`:i.orbit+=$_.value*r,t.position.copy(n.pos).add(nv.set(Math.sin(i.orbit),.35,Math.cos(i.orbit)).multiplyScalar(Q_.value*a)),t.up.set(0,1,0),t.lookAt(n.pos);return;case`side`:{av.set(0,0,-1).applyQuaternion(n.quat);let e=ev.value;(!i.spotInit||i.spot.distanceTo(n.pos)>e*3)&&(iv.set(0,1,0).applyQuaternion(n.quat),i.spot.copy(n.pos).addScaledVector(av,e*2+n.vel.length()*1.5).add(nv.crossVectors(av,iv).multiplyScalar(e*.5)),i.spotInit=!0),t.position.copy(i.spot),t.up.set(0,1,0),t.lookAt(n.pos);return}default:{let o=e===`far`;i.armInit||i.arm.copy(n.quat),i.armInit=!0,i.arm.slerp(n.quat,1-Math.exp(-q_.value*(o?.5:1)*r)),nv.set(0,o?X_.value:G_.value,o?Y_.value:W_.value).multiplyScalar(a).applyQuaternion(i.arm),t.position.copy(n.pos).add(nv),rv.set(0,0,-K_.value).applyQuaternion(n.quat).add(n.pos),t.up.copy(iv.set(0,1,0).applyQuaternion(i.arm)),t.lookAt(rv)}}}var dv=e=>x_(ov.cine,e);function fv(e,t,n,r=1,i=V_.value){uv(i,e,t,n,ov,r)}function pv(){let[e,t]=[`top`,`bottom`].map(e=>{let t=document.createElement(`div`);return t.className=`letterbox ${e}`,document.body.prepend(t),t}),n=``;return{update(r,i){let a=Math.round(i.h*__.value),o=`${r},${a},${i.x},${i.y},${i.w},${i.h}`;o!==n&&(n=o,e.style.cssText=`left:${i.x}px;top:${i.y}px;width:${i.w}px;height:${a}px`,t.style.cssText=`left:${i.x}px;top:${i.y+i.h-a}px;width:${i.w}px;height:${a}px`,e.dataset.on=t.dataset.on=String(r&&a>0))}}}var mv=[`render`,`toon`],hv=X.int(`render.toon.steps`,3,{min:2,max:8,hardMin:2,hardMax:64,tags:mv,desc:`shading bands`}),gv=X.num(`render.toon.floor`,.15,{min:0,max:.8,hardMin:0,hardMax:1,tags:mv,desc:`brightness of the darkest band`}),_v=X.color(`render.rim.color`,`#9fd8ff`,{tags:[`render`,`rim`]}),vv=X.num(`render.rim.strength`,.5,{min:0,max:2,hardMin:0,tags:[`render`,`rim`]}),yv=X.num(`render.rim.width`,.3,{min:0,max:1,hardMin:0,hardMax:1,tags:[`render`,`rim`],desc:`fraction of the silhouette that gets the rim band`}),bv=X.bool(`render.wireframe`,!1,{tags:[`render`,`debug`]});function xv(e,t){let n=new Uint8Array(e);for(let r=0;r<e;r++)n[r]=Math.round((t+(1-t)*(r/(e-1)))*255);return n}function Sv(e,t){let n=new Fr(xv(e,t),e,1,O);return n.minFilter=n.magFilter=i,n.needsUpdate=!0,n}var Cv={rimColor:{value:new q},rimStrength:{value:0},rimEdge:{value:0}},wv=new Set,Tv;id(()=>{let e=Sv(hv.value,gv.value);for(let t of wv)t.gradientMap=e,t.needsUpdate=!0;Tv?.dispose(),Tv=e}),id(()=>{Cv.rimColor.value.set(_v.value),Cv.rimStrength.value=vv.value,Cv.rimEdge.value=1-yv.value}),id(()=>{for(let e of wv)e.wireframe=bv.value});function Ev(e={}){let t=new so({...e,gradientMap:Tv,wireframe:bv.value});return t.onBeforeCompile=e=>{Object.assign(e.uniforms,Cv),e.fragmentShader=e.fragmentShader.replace(`void main() {`,`uniform vec3 rimColor;
uniform float rimStrength;
uniform float rimEdge;
void main() {`).replace(`#include <opaque_fragment>`,`float fres = 1.0 - clamp(dot(normalize(vViewPosition), normal), 0.0, 1.0);
        outgoingLight += rimColor * rimStrength * step(rimEdge, fres);
        #include <opaque_fragment>`)},wv.add(t),t}var Dv=X.color(`ship.color`,`#ff2fa8`,{tags:[`ship`,`render`]}),Ov=X.color(`ship.trim`,`#2a2440`,{tags:[`ship`,`render`]}),kv=X.color(`ship.glow`,`#7fe7ff`,{tags:[`ship`,`render`]}),Av=X.num(`ship.glow.intensity`,3,{min:0,max:10,hardMin:0,tags:[`ship`,`render`],desc:`above the bloom threshold the engine glows`});function jv(){let e=Ev(),t=Ev(),n=new br,r=new on,i=new Mr(new Si(.55,3.2,6),e);i.rotation.x=-Math.PI/2;let a=new Mr(new bi(4.2,.1,1.1),t);a.position.set(0,-.1,.7);let o=new Mr(new bi(.08,.8,.9),e);o.position.set(0,.45,1.05);let s=[-2.1,2.1].map(t=>{let n=new Mr(new bi(.12,.5,1.3),e);return n.position.set(t,0,.75),n}),c=new Mr(new xi(.32,.4,.3,10),n);c.rotation.x=Math.PI/2,c.position.z=1.65,r.add(i,a,o,...s,c);let l=new q,u=new q;return{object:r,update(r){e.color.set(Dv.value),t.color.set(Ov.value),n.color.copy(l.set(Ov.value).lerp(u.set(kv.value),.25+.75*r)).multiplyScalar(1+(Av.value-1)*r),c.scale.set(1,1+r,1)}}}var Mv=[`world`],Nv=X.int(`world.seed`,1,{min:0,max:99999,hardMin:0,tags:Mv,regen:!0}),Pv=X.int(`world.rocks.count`,400,{min:0,max:3e3,hardMin:0,hardMax:2e4,tags:Mv,regen:!0}),Fv=X.num(`world.rocks.radius`,900,{min:100,max:5e3,hardMin:10,unit:`m`,tags:Mv,regen:!0}),Iv=X.num(`world.rocks.size`,12,{min:1,max:60,hardMin:.1,unit:`m`,tags:Mv,regen:!0,desc:`max rock radius`}),Lv=X.int(`world.rings.count`,14,{min:0,max:60,hardMin:0,hardMax:500,tags:Mv,regen:!0,desc:`gates to fly through`}),Rv=X.color(`world.rocks.color`,`#8b86a8`,{tags:[`world`,`render`]}),zv=X.color(`world.rings.color`,`#ffd23f`,{tags:[`world`,`render`]});function Bv(e){let t=new on;e.add(t);let n=Ev(),r=Ev(),i=new Ha(1,0),a=new Ja(14,1.2,8,32),o,s,c=new K,l=new lt,u=new Vt,d=new W,f=new W;return id(()=>{let e=Fd(Nv.value),p=Pv.value,m=Fv.value,h=Iv.value;o&&(t.remove(o),o.dispose()),o=new Wr(i,n,p);for(let t=0;t<p;t++){do d.set(e()*2-1,e()*2-1,e()*2-1);while(d.lengthSq()>1);d.multiplyScalar(m),d.length()<60&&d.setLength(60+e()*40);let n=h*(.15+.85*e()**2);f.set(n*(.7+e()*.6),n*(.7+e()*.6),n*(.7+e()*.6)),l.setFromEuler(u.set(e()*6.3,e()*6.3,e()*6.3)),o.setMatrixAt(t,c.compose(d,l,f))}t.add(o),s&&(t.remove(s),s.dispose()),s=new Wr(a,r,Lv.value);let g=new W(0,0,-80),_=new W(0,0,-1);f.set(1,1,1);for(let t=0;t<Lv.value;t++)l.setFromUnitVectors(new W(0,0,1),_),s.setMatrixAt(t,c.compose(g,l,f)),_.add(d.set(e()-.5,(e()-.5)*.6,0).multiplyScalar(.7)).normalize(),_.z>-.6&&_.setZ(-.6).normalize(),g.addScaledVector(_,110+e()*60);t.add(s)}),{update(e){t.visible=e,n.color.set(Rv.value),r.color.set(zv.value)}}}var Vv=[`spires`,`monoliths`,`peaks`,`orbs`,`ribs`,`halos`,`lattice`,`shards`,`columns`],Hv=[`none`,`floor`,`ceiling`,`both`],Uv={ribArc:Math.PI*1.3,ribTube:.05,haloTube:.025},Wv=class{cells=new Map;cell;maxRad;constructor(e){let t=[],n=(e,n)=>{let r=null;e.forEach((i,a)=>{let o=n(a);(!r||r.distanceTo(i)>=o*.25||a===e.length-1)&&(t.push({p:i,rad:o}),r=i)})};n(e.pos,t=>Yf(e,e.s[t]));for(let t of e.branches??[])n(t.pos,e=>t.rad[e]);this.maxRad=t.reduce((e,t)=>Math.max(e,t.rad),0),this.cell=Math.max(50,this.maxRad*4);for(let e of t){let t=this.key(e.p.x,e.p.y,e.p.z),n=this.cells.get(t);n?n.push(e):this.cells.set(t,[e])}}key(e,t,n){let r=this.cell;return`${Math.floor(e/r)},${Math.floor(t/r)},${Math.floor(n/r)}`}isClear(e,t,n){let r=t+this.maxRad*n,i=Math.ceil(r/this.cell),a=Math.floor(e.x/this.cell),o=Math.floor(e.y/this.cell),s=Math.floor(e.z/this.cell);for(let r=-i;r<=i;r++)for(let c=-i;c<=i;c++)for(let l=-i;l<=i;l++){let i=this.cells.get(`${a+r},${o+c},${s+l}`);if(i){for(let r of i)if(r.p.distanceTo(e)<t+r.rad*n)return!1}}return!0}},Gv=new K,Kv=new W,qv=new W,Jv=new W(1,0,0),Yv=new W(0,1,0),Xv=new W(0,0,1);function Zv(e,t,n,r){let i=t.clone().applyQuaternion(e.quat),a=Math.max(1,Math.ceil(n/Math.max(r,1))),o=[];for(let t=-a;t<=a;t++)o.push({c:e.pos.clone().addScaledVector(i,n*t/a),r});return o}function Qv(e,t,n,r,i){Gv.compose(e.pos,e.quat,Kv.set(1,1,1));let a=Math.max(8,Math.ceil(t*i/Math.max(n*2,1))),o=[];for(let e=0;e<=a;e++){let s=r+i*e/a;o.push({c:new W(Math.cos(s)*t,Math.sin(s)*t,0).applyMatrix4(Gv),r:n})}return o}function $v(e){let t=e.scale;switch(e.kind){case`spires`:case`columns`:case`peaks`:return Zv(e,Yv,t.y,Math.max(t.x,t.z));case`monoliths`:return Zv(e,Yv,t.y/2,Math.hypot(t.x,t.z)/2);case`lattice`:return Zv(e,Jv,t.x/2,Math.hypot(t.y,t.z)/2);case`ribs`:return Qv(e,t.x,t.x*Uv.ribTube,-(Uv.ribArc-Math.PI)/2,Uv.ribArc);case`halos`:return Qv(e,t.x,t.x*Uv.haloTube,0,Math.PI*2);default:return[{c:e.pos.clone(),r:Math.max(t.x,t.y,t.z)}]}}function ey(e,t){let n=Fd(t.seed*7919+13),r=new Wv(e),i=e.radius,a=new W(1/0,1/0,1/0),o=new W(-1/0,-1/0,-1/0);for(let t of e.pos)a.min(t),o.max(t);for(let t of e.branches??[])for(let e of t.pos)a.min(e),o.max(e);let s=a.clone().add(o).multiplyScalar(.5),c=Math.max(o.x-a.x,o.z-a.z)/2,l=t.ground===`floor`||t.ground===`both`?a.y-i-t.gap:null,u=t.ground===`ceiling`||t.ground===`both`?o.y+i+t.gap:null,d=[],f=0,p=t.size,m=(e,t)=>e+(t-e)*n(),h=()=>new lt().setFromAxisAngle(Kv.set(n()*2-1,n()*2-1,n()*2-1).normalize(),n()*Math.PI*2),g=e=>new lt().setFromAxisAngle(Kv.set(n()*2-1,0,n()*2-1).normalize(),(n()*2-1)*e),_=(r,a=t.spread)=>{let o=Math.floor(n()*e.pos.length),s=Kv.set(n()*2-1,n()*2-1,n()*2-1);return s.addScaledVector(e.tan[o],-s.dot(e.tan[o])),s.lengthSq()<1e-6&&s.copy(e.up[o]),s.normalize(),e.pos[o].clone().addScaledVector(s,i*t.clearance+r+n()**1.5*a)},v=()=>new W(s.x+(n()*2-1)*(c+t.spread),0,s.z+(n()*2-1)*(c+t.spread)),y=e=>{let n=$v(e).every(e=>r.isClear(e.c,e.r,t.clearance));return n?d.push(e):f++,n};for(let r of t.kinds){let s=r===`ribs`||r===`halos`?Math.max(1,Math.round(t.count/10)):Math.max(0,Math.round(t.count)),c=r===`halos`?16:r===`ribs`?1:4;for(let f=0;f<s;f++)for(let s=0,f=d.length;s<c&&d.length===f;s++){let s=n();switch(r){case`spires`:{let e=p*m(.3,1),t=e*m(4,10);if(l!==null||u!==null){let i=l!==null&&(u===null||n()<.6);y({kind:r,pos:v().setY(i?l:u),quat:g(.25),scale:new W(e,t,e),tint:s})}else y({kind:r,pos:_(t),quat:h(),scale:new W(e,t,e),tint:s});break}case`monoliths`:{let e=p*m(.5,1.2);y({kind:r,pos:_(e*4),quat:g(.35),scale:new W(e,e*9,e*4),tint:s});break}case`peaks`:{let e=p*m(1.5,4),t=e*m(1.2,2.4);y(u===null?{kind:r,pos:_(t),quat:new lt().setFromAxisAngle(Jv,Math.PI).premultiply(g(.2)),scale:new W(e,t*.5,e),tint:s}:{kind:r,pos:v().setY(u),quat:new lt().setFromAxisAngle(Jv,Math.PI),scale:new W(e,t,e),tint:s});break}case`orbs`:{let e=p*m(.3,2.5)*(n()<.1?4:1);y({kind:r,pos:_(e),quat:new lt,scale:new W(e,e,e),tint:s});break}case`shards`:{let e=p*m(.15,.7);y({kind:r,pos:_(e,t.spread*.4),quat:h(),scale:new W(e*m(.5,1),e*m(1,3),e*m(.5,1)),tint:s});break}case`lattice`:{let e=p*12,t=p*m(20,60),i=_(0);i.set(Math.round(i.x/e)*e,Math.round(i.y/e)*e,Math.round(i.z/e)*e);let a=Math.floor(n()*3),o=new lt().setFromUnitVectors(Jv,a===0?Jv:a===1?Yv:Xv),c=p*m(.4,.9);y({kind:r,pos:i,quat:o,scale:new W(t,c,c),tint:s});break}case`columns`:{let e=p*m(.6,1.6),n=l??a.y-i-t.gap,c=((u??o.y+i+t.gap+p*20)-n)/2;y({kind:r,pos:v().setY(n+c),quat:new lt,scale:new W(e,c,e),tint:s});break}case`ribs`:{let t=5+Math.floor(n()*6),a=i*m(2.5,4),o=n()*e.length,c=i*m(2.2,3);for(let n=0;n<t;n++){let i=c*(.8+.4*Math.sin(Math.PI*(n+.5)/t));for(let t of[0,.7,-.7,1.4]){let c=((o+(n+t)*a)%e.length+e.length)%e.length,l=Math.floor(c/e.length*e.pos.length)%e.pos.length;Gv.makeBasis(e.right[l],e.up[l],qv.copy(e.tan[l]).negate());let u=new lt().setFromRotationMatrix(Gv);if(y({kind:r,pos:e.pos[l].clone(),quat:u,scale:new W(i,i,i),tint:s}))break}}break}case`halos`:{let t=Math.floor(n()*e.pos.length),a=i*m(2.5,6);Gv.makeBasis(e.right[t],e.up[t],qv.copy(e.tan[t]).negate());let o=new lt().setFromRotationMatrix(Gv).multiply(new lt().setFromAxisAngle(Jv,(n()*2-1)*.5));y({kind:r,pos:e.pos[t].clone(),quat:o,scale:new W(a,a,a),tint:s});break}}}}return{props:d,floorY:l,ceilY:u,centre:s,extent:c,rejected:f}}var ty={thrust:60,reverse:40,strafe:35,turnRate:[1.8,1.4,3],turnResponse:8,maxSpeed:120,overspeedDecay:1.5,boostThrust:160,boostSpeed:240,boostDrain:.35,boostRegen:.15,assist:!0,assistDamp:2.5},ny=100;function ry(e,t,n,r=ty,i=1/120){let a=e.branches?.indexOf(t)??-1,o={ship:r,walls:{shipRadius:1.5,bounce:.3,scrape:.8},track:e,course:{nearMiss:0}},s=tm();nm(s,e,{s:t.s0-ny-250,speed:Sm.speed});let c=s.race,l=Sd(),u={...Sm,route:n},d=t.s0-ny,f=t.s1+ny,p=null,m=!1,h=0,g=(f-d+250)/20/i;for(let t=0;t<g;t++){Lm(s.curr,e,c.near,c.time,l,null,u,c.loc.route);let t=c.wallHits;rm(s,l,o,i),c.events.length=0,c.loc.route===a&&(m=!0);let n=c.near.s;if(p===null&&n>=d&&n<f&&(p=c.time),p!==null&&(h+=c.wallHits-t,n>=f))return{time:c.time-p,wallHits:h,took:m}}return{time:null,wallHits:h,took:m}}var iy=(e,t)=>{let n=ry(e,t,`main`),r=ry(e,t,`any`);return n.time===null||r.time===null||!r.took||r.wallHits>0?null:1-r.time/n.time},ay={name:`corkscrew-stress`,desc:`Tight, twisting track at speed: two barrel rolls per lap plus heavy banking`,mode:`race`,seed:4815,spawn:{trackT:.42,speed:200},vars:{"gen.race.twist":2,"gen.race.twistNoise":1.5,"gen.race.radius":750,"cam.mode":`chase`,"ship.flightAssist":!1},presets:[]},oy={name:`easy-oval`,desc:`Wide, flat loop for tuning the basics`,mode:`race`,seed:1,spawn:{trackT:0,speed:0},vars:{"gen.race.wobble":.1,"gen.race.height":0,"gen.race.twistNoise":0,"gen.race.tubeRadius":60},presets:[]},sy={name:`free-flight`,desc:`Open rock field, no track`,mode:`free`,spawn:{speed:0},vars:{}},cy={name:`gauntlet-ramp`,desc:`Full gauntlet from easy to hard, arcade juice`,mode:`gauntlet`,seed:7,spawn:{trackT:0,speed:60},vars:{},presets:[`juice/arcade`]},ly={name:`laser-stress`,desc:`Only laser grids, at full difficulty from the start`,mode:`gauntlet`,seed:21,spawn:{trackT:0,speed:40},vars:{"gen.gauntlet.kinds.ring":!1,"gen.gauntlet.kinds.slalom":!1,"gen.gauntlet.kinds.crusher":!1,"gen.gauntlet.kinds.turbine":!1,"gen.gauntlet.kinds.debris":!1,"gen.gauntlet.rampStart":1,"gen.gauntlet.rampEnd":1}},uy={name:`proving-1`,desc:`Proving ground level 1: First flight: wide slalom gates`,mode:`proving`,seed:101,spawn:{trackT:0,speed:30},vars:{"proving.level":1,"proving.budget":90,"gen.race.radius":650,"gen.race.height":120,"gen.race.points":10,"gen.race.tubeRadius":30,"gen.race.checkpoints":6,"gen.race.profile":`tube`,"gen.proving.gateRadius":11,"gen.proving.gateRadiusMin":9,"gen.proving.offsetMin":.1,"gen.proving.offsetMax":.3,"gen.proving.gates":3,"gen.proving.beacons":1,"gen.proving.rampStart":0,"gen.proving.rampEnd":.3,"gen.proving.patterns.slalom":!0,"gen.proving.patterns.spiral":!1,"gen.proving.patterns.pairs":!1,"gen.proving.patterns.reverse":!1},presets:[]},dy={name:`proving-2`,desc:`Proving ground level 2: Pairs join the slalom`,mode:`proving`,seed:202,spawn:{trackT:0,speed:30},vars:{"proving.level":2,"proving.budget":80,"gen.race.radius":650,"gen.race.height":120,"gen.race.points":10,"gen.race.tubeRadius":30,"gen.race.checkpoints":6,"gen.race.profile":`tube`,"gen.proving.gateRadius":10,"gen.proving.gateRadiusMin":8,"gen.proving.offsetMin":.15,"gen.proving.offsetMax":.4,"gen.proving.gates":4,"gen.proving.beacons":1,"gen.proving.rampStart":0,"gen.proving.rampEnd":.4,"gen.proving.patterns.slalom":!0,"gen.proving.patterns.spiral":!1,"gen.proving.patterns.pairs":!0,"gen.proving.patterns.reverse":!1},presets:[]},fy={name:`proving-3`,desc:`Proving ground level 3: Spirals: roll to make the next gate down`,mode:`proving`,seed:303,spawn:{trackT:0,speed:30},vars:{"proving.level":3,"proving.budget":75,"gen.race.radius":600,"gen.race.height":120,"gen.race.points":10,"gen.race.tubeRadius":30,"gen.race.checkpoints":6,"gen.race.profile":`tube`,"gen.proving.gateRadius":9,"gen.proving.gateRadiusMin":7,"gen.proving.offsetMin":.2,"gen.proving.offsetMax":.5,"gen.proving.gates":4,"gen.proving.beacons":1,"gen.proving.rampStart":0,"gen.proving.rampEnd":.5,"gen.proving.patterns.slalom":!0,"gen.proving.patterns.spiral":!0,"gen.proving.patterns.pairs":!0,"gen.proving.patterns.reverse":!1},presets:[]},py={name:`proving-4`,desc:`Proving ground level 4: Tighter gates, more beacons`,mode:`proving`,seed:404,spawn:{trackT:0,speed:30},vars:{"proving.level":4,"proving.budget":80,"gen.race.radius":600,"gen.race.height":120,"gen.race.points":10,"gen.race.tubeRadius":30,"gen.race.checkpoints":6,"gen.race.profile":`tube`,"gen.proving.gateRadius":8.5,"gen.proving.gateRadiusMin":6.5,"gen.proving.offsetMin":.25,"gen.proving.offsetMax":.6,"gen.proving.gates":4,"gen.proving.beacons":2,"gen.proving.rampStart":0,"gen.proving.rampEnd":.6,"gen.proving.patterns.slalom":!0,"gen.proving.patterns.spiral":!0,"gen.proving.patterns.pairs":!0,"gen.proving.patterns.reverse":!1},presets:[]},my={name:`proving-5`,desc:`Proving ground level 5: Open space: no walls, stay in bounds`,mode:`proving`,seed:505,spawn:{trackT:0,speed:30},vars:{"proving.level":5,"proving.budget":90,"gen.race.radius":550,"gen.race.height":120,"gen.race.points":10,"gen.race.tubeRadius":30,"gen.race.checkpoints":6,"gen.race.profile":`open`,"gen.proving.gateRadius":8,"gen.proving.gateRadiusMin":6,"gen.proving.offsetMin":.3,"gen.proving.offsetMax":.65,"gen.proving.gates":4,"gen.proving.beacons":2,"gen.proving.rampStart":0,"gen.proving.rampEnd":.7,"gen.proving.patterns.slalom":!0,"gen.proving.patterns.spiral":!0,"gen.proving.patterns.pairs":!0,"gen.proving.patterns.reverse":!1},presets:[]},hy={name:`proving-6`,desc:`Proving ground level 6: Reverse gates: flip and fly back through`,mode:`proving`,seed:606,spawn:{trackT:0,speed:30},vars:{"proving.level":6,"proving.budget":110,"gen.race.radius":550,"gen.race.height":120,"gen.race.points":10,"gen.race.tubeRadius":30,"gen.race.checkpoints":6,"gen.race.profile":`tube`,"gen.proving.gateRadius":7.5,"gen.proving.gateRadiusMin":5.5,"gen.proving.offsetMin":.35,"gen.proving.offsetMax":.7,"gen.proving.gates":4,"gen.proving.beacons":2,"gen.proving.rampStart":0,"gen.proving.rampEnd":.8,"gen.proving.patterns.slalom":!0,"gen.proving.patterns.spiral":!0,"gen.proving.patterns.pairs":!0,"gen.proving.patterns.reverse":!0},presets:[]},gy={name:`proving-7`,desc:`Proving ground level 7: Open space with reverse gates`,mode:`proving`,seed:707,spawn:{trackT:0,speed:30},vars:{"proving.level":7,"proving.budget":95,"gen.race.radius":500,"gen.race.height":120,"gen.race.points":10,"gen.race.tubeRadius":30,"gen.race.checkpoints":6,"gen.race.profile":`open`,"gen.proving.gateRadius":7,"gen.proving.gateRadiusMin":5,"gen.proving.offsetMin":.35,"gen.proving.offsetMax":.75,"gen.proving.gates":4,"gen.proving.beacons":2,"gen.proving.rampStart":0,"gen.proving.rampEnd":.9,"gen.proving.patterns.slalom":!0,"gen.proving.patterns.spiral":!0,"gen.proving.patterns.pairs":!0,"gen.proving.patterns.reverse":!0},presets:[]},_y={name:`proving-8`,desc:`Proving ground level 8: The badge run`,mode:`proving`,seed:808,spawn:{trackT:0,speed:30},vars:{"proving.level":8,"proving.budget":100,"gen.race.radius":500,"gen.race.height":120,"gen.race.points":10,"gen.race.tubeRadius":30,"gen.race.checkpoints":6,"gen.race.profile":`open`,"gen.proving.gateRadius":7,"gen.proving.gateRadiusMin":4.5,"gen.proving.offsetMin":.4,"gen.proving.offsetMax":.8,"gen.proving.gates":4,"gen.proving.beacons":2,"gen.proving.rampStart":0,"gen.proving.rampEnd":1,"gen.proving.patterns.slalom":!0,"gen.proving.patterns.spiral":!0,"gen.proving.patterns.pairs":!0,"gen.proving.patterns.reverse":!0},presets:[]},vy={name:`rails-night`,desc:`Open rails profile with gates, neon look`,mode:`race`,seed:77,spawn:{trackT:0,speed:60},vars:{"gen.race.profile":`rails`,"gen.race.height":500},presets:[`visual/neon`]},yy={name:`sprint`,desc:`Short one-lap sprint against the ghost rivals`,mode:`race`,seed:12,spawn:{trackT:0,speed:0},vars:{"gen.race.radius":300,"gen.race.height":60,"race.laps":1,"race.rival.bot":!0},presets:[]},by={name:`venue-chitter`,title:`The Chitter Hive`,desc:`Through the comb of something enormous and still awake: hexagonal cells, star-shaped vents, sticky resin pools and chambers full of drifting brood plates.`,mode:`race`,seed:323,spawn:{trackT:0,speed:0},vars:{"gen.race.shape":`clover`,"gen.race.radius":900,"gen.race.height":220,"gen.race.tubeRadius":38,"gen.race.profile":`tube`,"gen.race.twistNoise":1,"gen.race.sections":8,"gen.race.sectionKinds":`hex,cavern,triangle,star`,"gen.race.sectionMin":200,"gen.race.sectionMax":600,"gen.race.hazards":5,"gen.race.hazardKinds":`iris,laser,turbine`,"gen.race.hazardDifficulty":.55,"gen.race.boostPads":3,"gen.race.slowFields":2,"render.background":`#0a0f02`,"render.sky.zenith":`#000000`,"render.stars.enabled":!1,"render.track.color":`#2e3a0c`,"render.track.stripe":`#d4ff3a`,"render.track.stripeEvery":22,"render.light.color":`#e8ff9a`,"render.light.dir":[.3,1,-.2],"render.ambient":.4,"render.outline.color":`#030500`,"render.rim.color":`#ffb020`,"render.rim.strength":.8,"render.gauntlet.color":`#ffb020`,"render.gauntlet.trim":`#3a2a04`,"render.pad.boost":`#d4ff3a`,"render.pad.slow":`#c88a10`,"render.pad.slowOpacity":.55,"render.mover.slab":`#8a6a1a`,"render.mover.rock":`#5a7a1a`,"race.checkpoint.color":`#d4ff3a`},presets:[]},xy={name:`venue-cindervault`,title:`Cindervault Mine`,desc:`A lava mine hollowed out of a cooling world: smoke-choked galleries, magma chambers with drifting slabs and falling slag, and crushers still working the seams.`,mode:`race`,seed:321,spawn:{trackT:0,speed:0},vars:{"gen.race.shape":`coil`,"gen.race.radius":850,"gen.race.height":260,"gen.race.tubeRadius":38,"gen.race.profile":`tube`,"gen.race.twistNoise":.8,"gen.race.sections":9,"gen.race.sectionKinds":`cavern,square,rect,irregular`,"gen.race.sectionMin":200,"gen.race.sectionMax":600,"gen.race.hazards":5,"gen.race.hazardKinds":`crusher,shutter,turbine`,"gen.race.hazardDifficulty":.6,"gen.race.boostPads":3,"gen.race.slowFields":3,"render.background":`#120402`,"render.sky.zenith":`#000000`,"render.stars.enabled":!1,"render.track.color":`#24100a`,"render.track.stripe":`#6a2410`,"render.track.stripeEvery":26,"render.light.color":`#ffb488`,"render.light.dir":[.1,1,.4],"render.ambient":.3,"render.toon.floor":.3,"render.outline.color":`#000000`,"render.rim.color":`#ff5a1f`,"render.rim.strength":.45,"render.gauntlet.color":`#ffb347`,"render.gauntlet.trim":`#2a0a04`,"render.pad.boost":`#ffe14d`,"render.pad.slow":`#b09484`,"render.pad.slowOpacity":.55,"render.mover.slab":`#5a3a2a`,"render.mover.rock":`#ff6a2a`,"race.checkpoint.color":`#ffb347`},presets:[]},Sy={name:`venue-glasswater`,title:`Glasswater Coil`,desc:`A ribbon that coils round and round a ring above a glassy sea, through a forest of crystal needles.`,mode:`race`,seed:301,spawn:{trackT:0,speed:0},vars:{"gen.race.shape":`coil`,"gen.race.radius":1100,"gen.race.tubeRadius":45,"gen.race.height":120,"gen.race.wobble":.2,"world.scenery.kinds":`spires`,"world.scenery.count":220,"world.scenery.size":45,"world.scenery.spread":900,"world.ground":`floor`,"world.ground.gap":220,"world.scenery.color":`#bff7ff`,"world.scenery.color2":`#5fc4dc`,"world.ground.color":`#1f6f7a`,"world.ground.color2":`#278592`,"render.background":`#9fe3d6`,"render.sky.zenith":`#1d4a7a`,"render.stars.enabled":!1,"render.sky.planet.size":16,"render.sky.planet.dir":[.5,.45,-.75],"render.sky.planet.color":`#f2f8ff`,"render.sky.planet.color2":`#c6d8ee`,"render.sky.planet.stripes":3,"render.sky.planet.ring":0,"render.track.color":`#0e3a4a`,"render.track.stripe":`#2a7f96`,"render.light.color":`#f4fffd`,"render.ambient":.5,"render.toon.floor":.4,"render.outline.color":`#0b2e3a`,"race.laps":2,"gen.race.profile":`rails`,"gen.race.sections":4,"gen.race.sectionKinds":`hex,ellipse,open`,"gen.race.sectionMin":400,"gen.race.sectionMax":900,"gen.race.hazards":3,"gen.race.hazardKinds":`iris,shutter`,"world.screens.count":4,"gen.race.boostPads":3},presets:[]},Cy={name:`venue-hoarfrost`,title:`Hoarfrost Grottoes`,desc:`Ice caves under a frozen moon: oval bores of blue ice, frost-fog drifts and wide grottoes where shelves of ice slide across and icicles drop.`,mode:`race`,seed:322,spawn:{trackT:0,speed:0},vars:{"gen.race.shape":`trefoil`,"gen.race.radius":900,"gen.race.height":240,"gen.race.tubeRadius":40,"gen.race.profile":`tube`,"gen.race.twistNoise":.9,"gen.race.sections":8,"gen.race.sectionKinds":`cavern,ellipse,irregular,octagon`,"gen.race.sectionMin":200,"gen.race.sectionMax":600,"gen.race.hazards":4,"gen.race.hazardKinds":`iris,ring`,"gen.race.hazardDifficulty":.5,"gen.race.boostPads":4,"gen.race.slowFields":2,"render.background":`#06121c`,"render.sky.zenith":`#000000`,"render.stars.enabled":!1,"render.track.color":`#1d3a52`,"render.track.stripe":`#bfefff`,"render.track.stripeEvery":34,"render.light.color":`#d8f4ff`,"render.light.dir":[-.3,1,.2],"render.ambient":.55,"render.outline.color":`#02060a`,"render.rim.color":`#9fe8ff`,"render.rim.strength":.9,"render.gauntlet.color":`#e8fbff`,"render.gauntlet.trim":`#3a7aa0`,"render.pad.boost":`#5ef0ff`,"render.pad.slow":`#dff4ff`,"render.pad.slowOpacity":.5,"render.mover.slab":`#a8dcf0`,"render.mover.rock":`#e8fbff`,"race.checkpoint.color":`#5ef0ff`},presets:[]},wy={name:`venue-hollowdeep`,title:`Hollowdeep Mine`,desc:`Down the shafts of a mine that was never finished: square galleries, rock chambers, slot drifts and blast doors, all of it underground.`,mode:`race`,seed:311,spawn:{trackT:0,speed:0},vars:{"gen.race.shape":`tangle`,"gen.race.radius":800,"gen.race.height":200,"gen.race.tubeRadius":36,"gen.race.profile":`tube`,"gen.race.twistNoise":1.2,"gen.race.sections":9,"gen.race.sectionKinds":`square,cavern,rect,irregular,octagon`,"gen.race.sectionMin":200,"gen.race.sectionMax":600,"gen.race.hazards":5,"gen.race.hazardKinds":`shutter,iris,turbine`,"gen.race.hazardDifficulty":.6,"render.background":`#0a0705`,"render.sky.zenith":`#000000`,"render.stars.enabled":!1,"render.track.color":`#3a2a1c`,"render.track.stripe":`#6b4a2a`,"render.track.stripeEvery":24,"render.light.color":`#ffb36b`,"render.light.dir":[.2,1,.3],"render.ambient":.35,"render.toon.floor":.3,"render.outline.color":`#000000`,"render.rim.color":`#ffcf5a`,"render.rim.strength":.6,"render.gauntlet.color":`#ffcf5a`,"render.gauntlet.trim":`#2a1a10`,"race.checkpoint.color":`#ff8a3d`},presets:[]},Ty={name:`venue-ixal`,title:`Veins of Ixal`,desc:`Inside a living crystal: a stunt run of loops and corkscrews through hexagon bores, diamond seams and glowing geodes.`,mode:`race`,seed:312,spawn:{trackT:0,speed:0},vars:{"gen.race.shape":`stunt`,"gen.race.radius":900,"gen.race.height":220,"gen.race.tubeRadius":38,"gen.race.profile":`tube`,"gen.race.sections":8,"gen.race.sectionKinds":`hex,cavern,diamond,star,irregular`,"gen.race.sectionMin":200,"gen.race.sectionMax":600,"gen.race.hazards":4,"gen.race.hazardKinds":`iris,laser`,"gen.race.hazardDifficulty":.55,"render.background":`#0b0418`,"render.sky.zenith":`#000000`,"render.stars.enabled":!1,"render.track.color":`#2a1050`,"render.track.stripe":`#5ee6ff`,"render.track.stripeEvery":30,"render.light.color":`#d8b8ff`,"render.light.dir":[-.4,1,.2],"render.ambient":.45,"render.outline.color":`#05010a`,"render.rim.color":`#5ee6ff`,"render.rim.strength":.9,"render.gauntlet.color":`#c77dff`,"render.gauntlet.trim":`#5ee6ff`,"race.checkpoint.color":`#5ee6ff`,"race.laps":2},presets:[]},Ey={name:`venue-knotwork`,title:`Knotwork of Vey`,desc:`A trefoil knot tied in open space, threaded with glowing halos beneath a ringed giant.`,mode:`race`,seed:303,spawn:{trackT:0,speed:0},vars:{"gen.race.shape":`trefoil`,"gen.race.radius":1e3,"gen.race.tubeRadius":40,"gen.race.height":150,"gen.race.profile":`rails`,"gen.race.twistNoise":.9,"world.scenery.kinds":`halos,orbs`,"world.scenery.count":90,"world.scenery.size":40,"world.scenery.spread":1200,"world.scenery.color":`#4b2a8a`,"world.scenery.color2":`#9a6cff`,"world.scenery.glow":`#ff7ad9`,"render.background":`#12052e`,"render.sky.zenith":`#3a1170`,"render.sky.planet.size":32,"render.sky.planet.dir":[-.55,.3,-.8],"render.sky.planet.color":`#ffb36b`,"render.sky.planet.color2":`#d9577a`,"render.sky.planet.stripes":9,"render.sky.planet.ring":2.3,"render.sky.planet.ringColor":`#ffe2b8`,"render.sky.planet.tilt":.45,"render.track.color":`#2b1650`,"render.track.stripe":`#ff7ad9`,"race.laps":2,"gen.race.sections":4,"gen.race.sectionKinds":`open,star,octagon`,"gen.race.sectionMin":500,"gen.race.sectionMax":1e3,"gen.race.hazards":3,"gen.race.hazardKinds":`iris,laser`,"world.screens.count":4},presets:[]},Dy={name:`venue-lattice`,title:`Brine Lattice`,desc:`A loop stood on its edge inside an endless lattice of girders, between a sea floor and a sea ceiling.`,mode:`race`,seed:306,spawn:{trackT:0,speed:0},vars:{"gen.race.shape":`upright`,"gen.race.radius":1e3,"gen.race.height":300,"gen.race.tubeRadius":40,"gen.race.profile":`halfpipe`,"world.scenery.kinds":`lattice,columns`,"world.scenery.count":160,"world.scenery.size":22,"world.scenery.spread":900,"world.ground":`both`,"world.ground.gap":150,"world.ground.band":300,"world.scenery.color":`#1c5a52`,"world.scenery.color2":`#58b09c`,"world.ground.color":`#0c2f33`,"world.ground.color2":`#12403f`,"render.background":`#2c8a7e`,"render.sky.zenith":`#0b2a33`,"render.stars.enabled":!1,"render.track.color":`#123c3a`,"render.track.stripe":`#8ef0c8`,"render.light.color":`#d8fff2`,"render.ambient":.45,"render.outline.color":`#04191a`,"gen.race.sections":4,"gen.race.sectionKinds":`square,rect,open`,"gen.race.sectionMin":300,"gen.race.sectionMax":700,"gen.race.hazards":4,"gen.race.hazardKinds":`shutter,crusher`,"world.screens.count":4},presets:[]},Oy={name:`venue-merrow`,title:`Hanging Peaks of Merrow`,desc:`Mountains grow downward from a ceiling of cloud here. The track dives and climbs between their tips.`,mode:`race`,seed:304,spawn:{trackT:0,speed:0},vars:{"gen.race.radius":1200,"gen.race.height":450,"gen.race.wobble":.3,"gen.race.points":14,"gen.race.tubeRadius":45,"world.scenery.kinds":`peaks,shards`,"world.scenery.count":110,"world.scenery.size":70,"world.scenery.spread":800,"world.ground":`ceiling`,"world.ground.gap":60,"world.ground.band":600,"world.scenery.color":`#a4683f`,"world.scenery.color2":`#e3b27a`,"world.ground.color":`#f5e6c8`,"world.ground.color2":`#ecd3a8`,"render.background":`#ffcf8a`,"render.sky.zenith":`#ff8a5c`,"render.stars.enabled":!1,"render.track.color":`#5a3218`,"render.track.stripe":`#c97a3a`,"render.light.color":`#fff1d6`,"render.light.dir":[.4,-.3,1],"render.ambient":.55,"render.toon.floor":.35,"render.outline.color":`#4a2410`,"gen.race.profile":`gates`,"gen.race.sections":4,"gen.race.sectionKinds":`cavern,open,diamond`,"gen.race.sectionMin":300,"gen.race.sectionMax":1e3,"gen.race.hazards":4,"gen.race.hazardKinds":`iris,turbine,shutter`,"world.screens.count":4,"gen.race.shape":`tangle`},presets:[]},ky={name:`venue-obsidian`,title:`Obsidian Choir`,desc:`A figure eight that crosses over itself among black monoliths standing on a violet plain.`,mode:`race`,seed:305,spawn:{trackT:0,speed:0},vars:{"gen.race.shape":`figure8`,"gen.race.radius":1100,"gen.race.height":260,"gen.race.tubeRadius":40,"world.scenery.kinds":`monoliths,halos`,"world.scenery.count":140,"world.scenery.size":38,"world.ground":`floor`,"world.ground.gap":180,"world.ground.band":180,"world.scenery.color":`#151020`,"world.scenery.color2":`#2a2140`,"world.scenery.glow":`#c77dff`,"world.ground.color":`#2b1e4a`,"world.ground.color2":`#33255a`,"render.background":`#3a2266`,"render.sky.zenith":`#07030f`,"render.sky.moons":1,"render.track.color":`#1c1430`,"render.track.stripe":`#7a4fd0`,"render.outline.color":`#000000`,"render.rim.color":`#c77dff`,"render.rim.strength":.8,"gen.race.profile":`rails`,"gen.race.sections":4,"gen.race.sectionKinds":`hex,triangle,star`,"gen.race.sectionMin":300,"gen.race.sectionMax":700,"gen.race.hazards":3,"gen.race.hazardKinds":`shutter,laser`,"world.screens.count":4},presets:[]},Ay={name:`venue-ossuary`,title:`Ossuary Reach`,desc:`Low over a rust plain and under the ribs of something that died here an age ago. Two moons watch.`,mode:`race`,seed:302,spawn:{trackT:0,speed:0},vars:{"gen.race.radius":1100,"gen.race.height":90,"gen.race.wobble":.4,"gen.race.tubeRadius":42,"world.scenery.kinds":`ribs,monoliths`,"world.scenery.count":60,"world.scenery.size":40,"world.ground":`floor`,"world.ground.gap":120,"world.ground.band":260,"world.scenery.color":`#f1e7d0`,"world.scenery.color2":`#c8b38a`,"world.ground.color":`#6b2f22`,"world.ground.color2":`#7f3b29`,"render.background":`#e0794e`,"render.sky.zenith":`#3b0f1f`,"render.sky.bands":7,"render.stars.count":600,"render.sky.moons":2,"render.sky.moonColor":`#ffe9d6`,"render.track.color":`#3a1a16`,"render.track.stripe":`#8a4a2e`,"render.light.color":`#ffd9b8`,"render.light.dir":[-1,.6,.4],"render.ambient":.35,"render.outline.color":`#2a0c10`,"gen.race.profile":`halfpipe`,"gen.race.sections":4,"gen.race.sectionKinds":`cavern,irregular,triangle`,"gen.race.sectionMin":250,"gen.race.sectionMax":700,"gen.race.hazards":3,"gen.race.hazardKinds":`shutter,crusher`,"world.screens.count":4},presets:[]},jy={name:`venue-pentacle`,title:`Pentacle Drift`,desc:`A five-lobed knot through a drifting cloud of shards, lit green by a striped giant.`,mode:`race`,seed:308,spawn:{trackT:0,speed:0},vars:{"gen.race.shape":`star`,"gen.race.radius":800,"gen.race.height":150,"gen.race.tubeRadius":38,"gen.race.profile":`gates`,"render.track.gateEvery":80,"world.scenery.kinds":`shards,orbs`,"world.scenery.count":260,"world.scenery.size":30,"world.scenery.spread":700,"world.scenery.color":`#2a3d2a`,"world.scenery.color2":`#9be36b`,"render.background":`#0a1f12`,"render.sky.zenith":`#1b0a24`,"render.sky.planet.size":40,"render.sky.planet.dir":[.2,.15,-1],"render.sky.planet.color":`#7bd389`,"render.sky.planet.color2":`#2f7a5a`,"render.sky.planet.stripes":14,"render.sky.planet.ring":0,"render.sky.planet.tilt":-.6,"render.sky.moons":5,"render.light.color":`#d8ffd0`,"render.light.dir":[.2,.3,-1],"render.track.color":`#1d3a22`,"render.track.stripe":`#b6ff6b`,"race.laps":2,"gen.race.sections":4,"gen.race.sectionKinds":`star,open,diamond`,"gen.race.sectionMin":500,"gen.race.sectionMax":1e3,"gen.race.hazards":4,"gen.race.hazardKinds":`turbine,iris`,"world.screens.count":4},presets:[]},My={name:`venue-saar`,title:`Pillars of Saar`,desc:`Between a floor and a sky of stone, held apart by pillars. The track rolls over twice a lap.`,mode:`race`,seed:309,spawn:{trackT:0,speed:0},vars:{"gen.race.radius":1200,"gen.race.height":260,"gen.race.twist":2,"gen.race.wobble":.35,"gen.race.tubeRadius":45,"world.scenery.kinds":`columns,shards`,"world.scenery.count":120,"world.scenery.size":45,"world.scenery.spread":1e3,"world.ground":`both`,"world.ground.gap":140,"world.ground.band":500,"world.scenery.color":`#b9a7d9`,"world.scenery.color2":`#e7defa`,"world.ground.color":`#8d7bb3`,"world.ground.color2":`#9d8cc2`,"render.background":`#efe6ff`,"render.sky.zenith":`#c3b0ea`,"render.stars.enabled":!1,"render.track.color":`#4b3a78`,"render.track.stripe":`#ffd23f`,"render.light.color":`#ffffff`,"render.ambient":.6,"render.toon.floor":.45,"render.outline.color":`#3a2b5c`,"gen.race.profile":`halfpipe`,"gen.race.sections":4,"gen.race.sectionKinds":`cavern,rect,square`,"gen.race.sectionMin":250,"gen.race.sectionMax":800,"gen.race.hazards":4,"gen.race.hazardKinds":`shutter,iris`,"world.screens.count":4,"gen.race.shape":`stunt`},presets:[]},Ny={name:`venue-spore`,title:`Spore Gardens`,desc:`A three-leaf clover that rises and falls through a meadow of drifting spore bubbles and soft stalks.`,mode:`race`,seed:307,spawn:{trackT:0,speed:0},vars:{"gen.race.shape":`clover`,"gen.race.radius":1100,"gen.race.height":220,"gen.race.tubeRadius":42,"gen.race.profile":`halfpipe`,"world.scenery.kinds":`orbs,spires`,"world.scenery.count":150,"world.scenery.size":40,"world.ground":`floor`,"world.ground.gap":160,"world.ground.band":220,"world.scenery.color":`#ff9fc6`,"world.scenery.color2":`#b8f28a`,"world.ground.color":`#8fd18a`,"world.ground.color2":`#a3dd96`,"render.background":`#ffe0ef`,"render.sky.zenith":`#b9d6ff`,"render.stars.enabled":!1,"render.sky.moons":3,"render.sky.moonColor":`#ffffff`,"render.track.color":`#d65a95`,"render.track.stripe":`#ffd1e6`,"render.light.color":`#fff6e8`,"render.ambient":.65,"render.toon.floor":.55,"render.outline.color":`#6b3a5a`,"render.outline.thickness":1.5,"gen.race.sections":4,"gen.race.sectionKinds":`cavern,irregular,ellipse`,"gen.race.sectionMin":250,"gen.race.sectionMax":800,"gen.race.hazards":3,"gen.race.hazardKinds":`iris,ring`,"world.screens.count":4,"gen.race.slowFields":3,"gen.race.boostPads":1},presets:[]},Py={name:`venue-sunwheel`,title:`Sunwheel`,desc:`A wheel on its edge before a swollen red sun, ringed by halos and the ribs of a ruined station. It rolls once a lap.`,mode:`race`,seed:310,spawn:{trackT:0,speed:0},vars:{"gen.race.shape":`upright`,"gen.race.radius":1300,"gen.race.height":380,"gen.race.twist":1,"gen.race.tubeRadius":45,"gen.race.profile":`rails`,"world.scenery.kinds":`halos,ribs,shards`,"world.scenery.count":80,"world.scenery.size":35,"world.scenery.spread":900,"world.scenery.color":`#3a2020`,"world.scenery.color2":`#7a3a2a`,"world.scenery.glow":`#ffb000`,"render.background":`#2a0505`,"render.sky.zenith":`#000000`,"render.sky.planet.size":45,"render.sky.planet.dir":[0,.1,-1],"render.sky.planet.color":`#ff5a1f`,"render.sky.planet.color2":`#ff8a2a`,"render.sky.planet.stripes":4,"render.sky.planet.ring":0,"render.light.color":`#ffb38a`,"render.light.dir":[0,.1,-1],"render.ambient":.3,"render.track.color":`#3a1010`,"render.track.stripe":`#ffb000`,"render.rim.color":`#ff7a3d`,"render.rim.strength":.9,"gen.race.sections":4,"gen.race.sectionKinds":`open,octagon,diamond`,"gen.race.sectionMin":500,"gen.race.sectionMax":1e3,"gen.race.hazards":3,"gen.race.hazardKinds":`iris,turbine`,"world.screens.count":4,"gen.race.boostPads":2,"gen.race.slowFields":2},presets:[]},Fy=Object.entries(Object.assign({"/presets/feel/balanced.json":{desc:`The default ship: even thrust, speed and turn`,vars:{"ship.thrust.forward":60,"ship.thrust.reverse":40,"ship.thrust.strafe":35,"ship.turn.rate":[1.8,1.4,3],"ship.speed.max":120,"ship.boost.thrust":160,"ship.boost.speed":240,"ship.assist.damp":2.5,"ship.radius":1.5}},"/presets/feel/heavy.json":{desc:`Heavy and slow: steady, grippy, a big hull to fit through the gates`,vars:{"ship.thrust.forward":45,"ship.thrust.reverse":35,"ship.thrust.strafe":28,"ship.turn.rate":[1.4,1.1,2.4],"ship.speed.max":95,"ship.boost.thrust":130,"ship.boost.speed":190,"ship.assist.damp":3.5,"ship.radius":2}},"/presets/feel/light.json":{desc:`Light and fast: quick turns and a small hull, easy to overshoot a gate`,vars:{"ship.thrust.forward":80,"ship.thrust.reverse":50,"ship.thrust.strafe":45,"ship.turn.rate":[2.3,1.8,3.8],"ship.speed.max":150,"ship.boost.thrust":190,"ship.boost.speed":290,"ship.assist.damp":2,"ship.radius":1.2}},"/presets/hud/classic.json":{desc:`Speed bottom centre, timer top centre, map bottom right`,vars:{"hud.speed.x":.5,"hud.speed.y":.9,"hud.speed.scale":1,"hud.speed.visible":!0,"hud.timer.x":.5,"hud.timer.y":.07,"hud.timer.scale":1,"hud.timer.visible":!0,"hud.minimap.x":.9,"hud.minimap.y":.82,"hud.minimap.scale":1,"hud.minimap.visible":!0,"hud.arrow.x":.5,"hud.arrow.y":.2,"hud.arrow.scale":1,"hud.arrow.visible":!0}},"/presets/hud/minimal.json":{desc:`Just speed and the timer, small`,vars:{"hud.speed.x":.5,"hud.speed.y":.93,"hud.speed.scale":.8,"hud.speed.visible":!0,"hud.timer.x":.5,"hud.timer.y":.05,"hud.timer.scale":.8,"hud.timer.visible":!0,"hud.minimap.x":.9,"hud.minimap.y":.82,"hud.minimap.scale":1,"hud.minimap.visible":!1,"hud.arrow.x":.5,"hud.arrow.y":.2,"hud.arrow.scale":1,"hud.arrow.visible":!1}},"/presets/hud/racer.json":{desc:`Big timer top left, speed bottom right, map bottom left`,vars:{"hud.speed.x":.88,"hud.speed.y":.9,"hud.speed.scale":1.2,"hud.speed.visible":!0,"hud.timer.x":.14,"hud.timer.y":.09,"hud.timer.scale":1.4,"hud.timer.visible":!0,"hud.minimap.x":.1,"hud.minimap.y":.8,"hud.minimap.scale":1.1,"hud.minimap.visible":!0,"hud.arrow.x":.5,"hud.arrow.y":.12,"hud.arrow.scale":1.2,"hud.arrow.visible":!0}},"/presets/juice/arcade.json":{desc:`Punchy: every effect on at its default strength, with sound`,vars:{"juice.master":1,"juice.shake.enabled":!0,"juice.shake.intensity":1,"juice.fov.enabled":!0,"juice.fov.intensity":1,"juice.speedLines.enabled":!0,"juice.speedLines.intensity":1,"juice.hitStop.enabled":!0,"juice.hitStop.intensity":1,"juice.nearMiss.enabled":!0,"juice.nearMiss.intensity":1,"juice.camLag.enabled":!0,"juice.camLag.intensity":1,"juice.bank.enabled":!0,"juice.bank.intensity":1,"juice.trails.enabled":!0,"juice.trails.intensity":1,"juice.sparks.enabled":!0,"juice.sparks.intensity":1,"juice.flash.enabled":!0,"juice.flash.intensity":1,"juice.lens.enabled":!0,"juice.lens.intensity":1,"juice.audio.enabled":!0,"juice.audio.intensity":1}},"/presets/juice/off.json":{desc:`No effects: plain flight, for tuning feel or for motion sensitivity`,vars:{"juice.master":0,"juice.shake.enabled":!1,"juice.shake.intensity":1,"juice.fov.enabled":!1,"juice.fov.intensity":1,"juice.speedLines.enabled":!1,"juice.speedLines.intensity":1,"juice.hitStop.enabled":!1,"juice.hitStop.intensity":1,"juice.nearMiss.enabled":!1,"juice.nearMiss.intensity":1,"juice.camLag.enabled":!1,"juice.camLag.intensity":1,"juice.bank.enabled":!1,"juice.bank.intensity":1,"juice.trails.enabled":!1,"juice.trails.intensity":1,"juice.sparks.enabled":!1,"juice.sparks.intensity":1,"juice.flash.enabled":!1,"juice.flash.intensity":1,"juice.lens.enabled":!1,"juice.lens.intensity":1,"juice.audio.enabled":!1,"juice.audio.intensity":1}},"/presets/juice/overkill.json":{desc:`Everything turned up past sensible`,vars:{"juice.master":1,"juice.shake.enabled":!0,"juice.shake.intensity":2.2,"juice.fov.enabled":!0,"juice.fov.intensity":2.2,"juice.speedLines.enabled":!0,"juice.speedLines.intensity":2.2,"juice.hitStop.enabled":!0,"juice.hitStop.intensity":2,"juice.nearMiss.enabled":!0,"juice.nearMiss.intensity":1.5,"juice.camLag.enabled":!0,"juice.camLag.intensity":2.2,"juice.bank.enabled":!0,"juice.bank.intensity":2.2,"juice.trails.enabled":!0,"juice.trails.intensity":2.2,"juice.sparks.enabled":!0,"juice.sparks.intensity":2.2,"juice.flash.enabled":!0,"juice.flash.intensity":2.2,"juice.lens.enabled":!0,"juice.lens.intensity":2.5,"juice.audio.enabled":!0,"juice.audio.intensity":1.5,"juice.shake.decay":1,"juice.camLag.damping":.3,"juice.trails.length":90,"juice.speedLines.count":160}},"/presets/juice/subtle.json":{desc:`Light touch: gentle shake, FOV and trails; no freezes or slow-mo, no sound`,vars:{"juice.master":1,"juice.shake.enabled":!0,"juice.shake.intensity":.5,"juice.fov.enabled":!0,"juice.fov.intensity":.5,"juice.speedLines.enabled":!0,"juice.speedLines.intensity":.5,"juice.hitStop.enabled":!1,"juice.hitStop.intensity":.5,"juice.nearMiss.enabled":!1,"juice.nearMiss.intensity":.5,"juice.camLag.enabled":!0,"juice.camLag.intensity":.5,"juice.bank.enabled":!0,"juice.bank.intensity":.6,"juice.trails.enabled":!0,"juice.trails.intensity":.6,"juice.sparks.enabled":!0,"juice.sparks.intensity":.5,"juice.flash.enabled":!0,"juice.flash.intensity":.5,"juice.lens.enabled":!0,"juice.lens.intensity":.5,"juice.audio.enabled":!1,"juice.audio.intensity":.5}},"/presets/visual/ink.json":{desc:`Black ink on paper`,vars:{"render.background":`#efe8d8`,"render.sky.zenith":`#d9cfb8`,"render.sky.bands":3,"render.stars.enabled":!1,"ship.color":`#f5f0e6`,"ship.trim":`#1b1b1b`,"world.rocks.color":`#e6dcc6`,"world.rings.color":`#f5f0e6`,"render.toon.steps":2,"render.toon.floor":.55,"render.light.color":`#ffffff`,"render.rim.strength":0,"render.outline.color":`#111111`,"render.outline.thickness":2,"render.bloom.enabled":!1}},"/presets/visual/mono.json":{desc:`Greyscale, hard two-tone`,vars:{"render.background":`#101010`,"render.sky.zenith":`#2a2a2a`,"render.sky.bands":4,"render.stars.enabled":!0,"ship.color":`#e8e8e8`,"ship.trim":`#3a3a3a`,"ship.glow":`#ffffff`,"world.rocks.color":`#9a9a9a`,"world.rings.color":`#ffffff`,"render.toon.steps":2,"render.toon.floor":.2,"render.light.color":`#ffffff`,"render.rim.strength":.5,"render.rim.color":`#ffffff`,"render.outline.color":`#000000`,"render.outline.thickness":2,"render.bloom.enabled":!0,"render.bloom.strength":.8,"render.bloom.threshold":1.4}},"/presets/visual/neon.json":{desc:`Neon toon on deep space`,vars:{"render.background":`#05010f`,"render.sky.zenith":`#1a0b3d`,"render.sky.bands":5,"render.stars.enabled":!0,"ship.color":`#ff2fa8`,"ship.trim":`#2a2440`,"world.rocks.color":`#8b86a8`,"world.rings.color":`#ffd23f`,"render.toon.steps":3,"render.toon.floor":.15,"render.light.color":`#7fe7ff`,"render.rim.strength":.6,"render.rim.color":`#ff7ad9`,"render.outline.color":`#000000`,"render.outline.thickness":1.5,"render.bloom.enabled":!0,"render.bloom.strength":1.2}},"/presets/visual/pastel.json":{desc:`Soft pastel daylight`,vars:{"render.background":`#ffd9e8`,"render.sky.zenith":`#b8d8ff`,"render.sky.bands":6,"render.stars.enabled":!1,"ship.color":`#9ad9c5`,"ship.trim":`#f6f1ff`,"ship.glow":`#ffb3c7`,"world.rocks.color":`#c9b8e8`,"world.rings.color":`#ffe29a`,"render.toon.steps":3,"render.toon.floor":.6,"render.ambient":.6,"render.light.color":`#fff6e0`,"render.rim.strength":.35,"render.rim.color":`#ffffff`,"render.outline.color":`#6b5a7a`,"render.outline.thickness":1.5,"render.bloom.enabled":!0,"render.bloom.strength":.5,"render.bloom.threshold":1.6}}})).map(([e,t])=>{let[n,r]=e.replace(/^\/presets\//,``).replace(/\.json$/,``).split(`/`);return{id:`${n}/${r}`,name:r,layer:`preset:${n}`,desc:t.desc,vars:t.vars}});function Iy(e,t){e.setLayer(t.layer,t.vars)}function Ly(e,t){let n=e.snapshot()[t]??{};return Fy.find(e=>{if(e.layer!==t)return!1;let r=Object.keys(e.vars);return r.length===Object.keys(n).length&&r.every(t=>ud(n[t],e.vars[t]))})}var Ry=[`race`,`gauntlet`,`proving`,`free`],zy=e=>Ry.includes(e),By=Object.entries(Object.assign({"/scenarios/corkscrew-stress.json":ay,"/scenarios/easy-oval.json":oy,"/scenarios/free-flight.json":sy,"/scenarios/gauntlet-ramp.json":cy,"/scenarios/laser-stress.json":ly,"/scenarios/proving-1.json":uy,"/scenarios/proving-2.json":dy,"/scenarios/proving-3.json":fy,"/scenarios/proving-4.json":py,"/scenarios/proving-5.json":my,"/scenarios/proving-6.json":hy,"/scenarios/proving-7.json":gy,"/scenarios/proving-8.json":_y,"/scenarios/rails-night.json":vy,"/scenarios/sprint.json":yy,"/scenarios/venue-chitter.json":by,"/scenarios/venue-cindervault.json":xy,"/scenarios/venue-glasswater.json":Sy,"/scenarios/venue-hoarfrost.json":Cy,"/scenarios/venue-hollowdeep.json":wy,"/scenarios/venue-ixal.json":Ty,"/scenarios/venue-knotwork.json":Ey,"/scenarios/venue-lattice.json":Dy,"/scenarios/venue-merrow.json":Oy,"/scenarios/venue-obsidian.json":ky,"/scenarios/venue-ossuary.json":Ay,"/scenarios/venue-pentacle.json":jy,"/scenarios/venue-saar.json":My,"/scenarios/venue-spore.json":Ny,"/scenarios/venue-sunwheel.json":Py})).map(([e,t])=>({...t,name:t.name??e.replace(/^\/scenarios\//,``).replace(/\.json$/,``)})),Vy=(e=By)=>e.filter(e=>e.name.startsWith(`venue-`)&&e.title);function Hy(e){if(!e||typeof e!=`object`||Array.isArray(e))return;let t=e;if(![`mode`,`seed`,`spawn`,`vars`,`presets`].some(e=>e in t))return;let n={name:typeof t.name==`string`?t.name:`dropped`};if(typeof t.title==`string`&&(n.title=t.title),typeof t.desc==`string`&&(n.desc=t.desc),zy(t.mode)&&(n.mode=t.mode),typeof t.seed==`number`&&Number.isFinite(t.seed)&&(n.seed=Math.round(t.seed)),t.spawn&&typeof t.spawn==`object`){let e=t.spawn;n.spawn={},typeof e.trackT==`number`&&Number.isFinite(e.trackT)&&(n.spawn.trackT=e.trackT),typeof e.speed==`number`&&Number.isFinite(e.speed)&&(n.spawn.speed=e.speed)}return t.vars&&typeof t.vars==`object`&&!Array.isArray(t.vars)&&(n.vars={...t.vars}),Array.isArray(t.presets)&&(n.presets=t.presets.filter(e=>typeof e==`string`)),n}function Uy(e){let t={...e.vars};return e.mode&&(t[`game.mode`]=e.mode),e.seed!==void 0&&(t[`gen.race.seed`]=e.seed),t}var Wy=()=>{};function Gy(e){Wy=e}var Ky=()=>({trackT:0,speed:0});function qy(e){Ky=e}var Jy=()=>Ky();function Yy(e,t){let n=Uy(t),r=e.snapshot(),i=[];for(let[e,t]of Object.entries(r.scenario??{}))e in n||i.push({layer:`scenario`,path:e,before:t,after:void 0});for(let[e,t]of Object.entries(n)){i.push({layer:`scenario`,path:e,before:r.scenario?.[e],after:t});let n=r.user?.[e];n!==void 0&&i.push({layer:`user`,path:e,before:n,after:void 0})}e.change(i);for(let n of t.presets??[]){let r=Fy.find(e=>e.id===n);r?Iy(e,r):console.warn(`kocmoc: scenario "${t.name}" names unknown preset ${n}`)}Wy({trackT:t.spawn?.trackT??0,speed:t.spawn?.speed??0})}function Xy(e,t,n){let r=e.snapshot(),i={...r.scenario,...r.user},a=i[`game.mode`],o=i[`gen.race.seed`];delete i[`game.mode`],delete i[`gen.race.seed`];let s={name:t};return s.mode=zy(a)?a:`race`,s.seed=typeof o==`number`?o:e.get(`gen.race.seed`)?.value,s.spawn={trackT:Math.round(n.trackT*1e4)/1e4,speed:Math.round(n.speed)},s.vars=i,s.presets=ad.filter(e=>e.startsWith(`preset:`)).map(t=>Ly(e,t)?.id).filter(e=>!!e),s}var Zy=X.enum(`game.mode`,`race`,Ry,{tags:[`game`],desc:`race: generated track; gauntlet: the track filled with obstacles; proving: gates against the clock; free: open rock field`}),Qy=()=>Zy.value!==`free`,$y=[`gen`,`race`],eb={seed:X.int(`gen.race.seed`,1,{min:0,max:99999,hardMin:0,tags:$y,regen:!0,desc:`also in the URL as ?seed=`}),points:X.int(`gen.race.points`,12,{min:5,max:40,hardMin:4,hardMax:200,tags:$y,regen:!0,desc:`control points around the loop`}),radius:X.num(`gen.race.radius`,1e3,{min:250,max:4e3,hardMin:50,unit:`m`,tags:$y,regen:!0}),wobble:X.num(`gen.race.wobble`,.35,{min:0,max:.8,hardMin:0,hardMax:.95,tags:$y,regen:!0,desc:`radial randomness`}),height:X.num(`gen.race.height`,250,{min:0,max:1200,hardMin:0,unit:`m`,tags:$y,regen:!0,desc:`vertical randomness`}),twist:X.num(`gen.race.twist`,0,{min:-4,max:4,step:1,tags:$y,regen:!0,desc:`whole barrel rolls per lap (rounded)`}),twistNoise:X.num(`gen.race.twistNoise`,.5,{min:0,max:3,hardMin:0,unit:`rad`,tags:$y,regen:!0,desc:`random banking per control point`}),tube:X.num(`gen.race.tubeRadius`,40,{min:10,max:120,hardMin:3,unit:`m`,tags:$y,regen:!0,desc:`corridor radius; keep the loop radius ~25× this for varied layouts`}),spacing:X.num(`gen.race.spacing`,4,{min:1,max:20,hardMin:.5,unit:`m`,tags:$y,regen:!0,desc:`centreline sample spacing`}),shape:X.enum(`gen.race.shape`,`loop`,Id,{tags:$y,regen:!0,desc:`layout: loop (wobbly ring), figure8, trefoil / star / coil (knots), upright (a loop on its edge), clover`}),checkpoints:X.int(`gen.race.checkpoints`,8,{min:2,max:32,hardMin:1,hardMax:200,tags:$y,regen:!0})},tb={forks:X.int(`gen.race.forks`,3,{min:0,max:6,hardMin:0,hardMax:12,tags:[...$y,`route`],regen:!0,desc:`race mode: alternate routes to try to fit (shortcut, long way, split, hidden in turn)`}),pitLane:X.bool(`gen.race.pitLane`,!0,{tags:[...$y,`route`],regen:!0,desc:`race mode: a slow lane before the start line that refills boost`}),saveMin:X.num(`gen.race.route.saveMin`,.03,{min:0,max:.3,hardMin:0,hardMax:1,tags:[...$y,`route`],regen:!0,desc:`a shortcut must save at least this share of the main line's time (the autopilot flies both)`}),saveMax:X.num(`gen.race.route.saveMax`,.2,{min:.05,max:.6,hardMin:0,hardMax:1,tags:[...$y,`route`],regen:!0,desc:`and at most this share`}),costMax:X.num(`gen.race.route.costMax`,.3,{min:.05,max:1,hardMin:0,tags:[...$y,`route`],regen:!0,desc:`the long way may cost at most this share more`})},nb={count:X.int(`gen.race.sections`,0,{min:0,max:8,hardMin:0,hardMax:32,tags:[...$y,`section`],regen:!0,desc:`race mode: stretches with their own cross-section (hex / square tunnels, irregular bores, caverns, open air)`}),kinds:X.str(`gen.race.sectionKinds`,Ff.join(`,`),{tags:[...$y,`section`],regen:!0,desc:`comma-separated, used in turn: ${Ff.join(`, `)}`}),minLength:X.num(`gen.race.sectionMin`,300,{min:50,max:3e3,hardMin:10,unit:`m`,tags:[...$y,`section`],regen:!0}),maxLength:X.num(`gen.race.sectionMax`,900,{min:50,max:5e3,hardMin:10,unit:`m`,tags:[...$y,`section`],regen:!0})},rb=[`render`,`track`],ib=[`race`,`render`,`route`],ab={shortcut:X.color(`race.route.shortcut`,`#ff5d73`,{tags:ib,desc:`shortcut sign and stripes`}),long:X.color(`race.route.long`,`#7cff6b`,{tags:ib,desc:`long way sign and stripes`}),split:X.color(`race.route.split`,`#ff9f1c`,{tags:ib,desc:`split sign and stripes`}),pit:X.color(`race.route.pit`,`#4da3ff`,{tags:ib,desc:`pit lane sign and stripes`})},ob={shortcut:`SHORTCUT`,long:`LONG WAY`,split:`SPLIT`,hidden:`HIDDEN ROUTE`,pit:`PIT LANE`},sb=X.enum(`gen.race.profile`,`tube`,[`tube`,`halfpipe`,`rails`,`gates`,`open`],{tags:rb,desc:`look of the corridor; walls collide for all but open (open space: faint guide rings, out-of-bounds timer)`}),cb=()=>sb.value===`open`,lb=X.num(`race.oob.time`,3,{min:.5,max:15,hardMin:.05,unit:`s`,tags:[`race`],desc:`open space: seconds outside the corridor before you are put back`}),ub=X.color(`render.track.color`,`#3b2a6b`,{tags:rb}),db=X.color(`render.track.stripe`,`#5a3fa0`,{tags:rb}),fb=X.num(`render.track.stripeEvery`,40,{min:4,max:200,hardMin:1,unit:`m`,tags:rb,desc:`stripe length, for a sense of speed`}),pb=X.num(`render.track.gateEvery`,60,{min:10,max:400,hardMin:2,unit:`m`,tags:rb}),mb=X.color(`race.checkpoint.color`,`#40e0ff`,{tags:[`race`,`render`]}),hb=X.color(`race.start.color`,`#ffd23f`,{tags:[`race`,`render`]}),gb=X.num(`race.checkpoint.glow`,1.4,{min:0,max:6,hardMin:0,tags:[`race`,`render`],desc:`above the bloom threshold checkpoints glow`}),_b=$u(()=>({seed:eb.seed.value,points:eb.points.value,radius:eb.radius.value,wobble:eb.wobble.value,height:eb.height.value,twist:eb.twist.value,twistNoise:eb.twistNoise.value,tubeRadius:eb.tube.value,spacing:eb.spacing.value,checkpoints:eb.checkpoints.value,...eb.shape.value===`loop`?{}:{shape:eb.shape.value}})),vb=$u(()=>{let e=Zy.value===`race`;return{seed:eb.seed.value,forks:e?tb.forks.value:0,pitLane:e&&tb.pitLane.value,saveMin:tb.saveMin.value,saveMax:tb.saveMax.value,costMax:tb.costMax.value}}),yb=$u(()=>({seed:eb.seed.value,count:Zy.value===`race`?nb.count.value:0,kinds:nb.kinds.value.split(`,`).map(e=>e.trim()).filter(e=>Ff.includes(e)),minLength:nb.minLength.value,maxLength:Math.max(nb.minLength.value,nb.maxLength.value)})),bb=()=>vb.value.forks>0||vb.value.pitLane,xb=$u(()=>Zd(_b.value)),Z=$u(()=>Zf(Cf(xb.value,vb.value,iy),yb.value)),Sb=eb.seed;function Cb(e,t,n,r,i,a=!0,o){let s=e.pos.length,c=t.length,l=new Float32Array(s*c*3),u=new Float32Array(s*c),d=new W,f=new W;for(let r=0;r<s;r++){i?i(r,d):d.copy(e.pos[r]);let a=Math.floor(e.s[r]/fb.value)%2;for(let i=0;i<c;i++){let o=typeof n==`number`?n:typeof n==`function`?n(r,t[i]):n[r];f.copy(d).addScaledVector(e.right[r],Math.cos(t[i])*o).addScaledVector(e.up[r],Math.sin(t[i])*o),f.toArray(l,(r*c+i)*3),u[r*c+i]=a}}let p=[],m=r?c:c-1,h=new W,g=new W;for(let e=0;e<(a?s:s-1);e++){let t=(e+1)%s;for(let n=0;n<m;n++){let r=(n+1)%c,i=e*c+n,a=t*c+n,s=t*c+r,u=e*c+r;if(o){h.set(0,0,0);for(let e of[i,a,s,u])h.add(g.fromArray(l,e*3));if(!o(e,h.multiplyScalar(.25)))continue}p.push(i,a,u,a,s,u)}}return{position:l,stripe:u,index:p}}function wb(e,t,n){let r=e.reduce((e,t)=>e+t.stripe.length,0),i=new Float32Array(r*3),a=new Float32Array(r*3),o=[],s=0;for(let r of e){let[e,c]=r.colors??[t,n];i.set(r.position,s*3);for(let t=0;t<r.stripe.length;t++)(r.stripe[t]?c:e).toArray(a,(s+t)*3);for(let e of r.index)o.push(e+s);s+=r.stripe.length}let c=new cr;return c.setAttribute(`position`,new qn(i,3)),c.setAttribute(`color`,new qn(a,3)),c.setIndex(o),c.computeVertexNormals(),c}var Tb=(e,t,n,r)=>Array.from({length:e},(i,a)=>t+(n-t)*a/(r?e-1:e));function Eb(e,t,n,r,i,a=0){let o=t.pos.length,s=new K,c=new K;n.forEach((n,l)=>{let u=Math.min(o-1,Math.round(n/r*o))%o;s.makeBasis(t.right[u],t.up[u],t.tan[u]).setPosition(t.pos[u]),i&&s.multiply(c.makeScale(i(u),i(u),1)),e.setMatrixAt(a+l,s)}),e.instanceMatrix.needsUpdate=!0}var Db=(e,t)=>Math.min(e.pos.length-1,Math.floor((t%e.length+e.length)%e.length/e.length*e.pos.length));function Ob(e){if(e.sections?.length)return t=>{let n=e.pos.length;return!qf(e,e.s[t])&&!qf(e,e.s[(t+1)%n])}}var kb=(e,t,n)=>({pos:e.pos.slice(t,n+1),tan:e.tan.slice(t,n+1),up:e.up.slice(t,n+1),right:e.right.slice(t,n+1),s:e.s.slice(t,n+1)});function Ab(e,t,n,r){let i=e.pos.length,a=kb(e,Math.max(0,Math.floor(t.s0/e.length*i)),Math.min(i-1,Math.ceil(t.s1/e.length*i))),o={rho:0,open:!1,oob:0},s=wb([Cb(a,Hf(t),(n,r)=>Jf(e,Math.min(t.s1-.001,Math.max(t.s0+.001,a.s[n])),r,o).rho,!0,void 0,!1)],n,r),c=s.toNonIndexed();return s.dispose(),c.computeVertexNormals(),c}function jb(e){let t=e.branches??[];if(!t.length)return Ob(e);let n=Ob(e),r=e.radius,i={index:0,t:0,s:0,point:new W,dist:1/0};return(a,o)=>{if(n&&!n(a,o))return!1;let s=e.s[a];for(let e of t)if(!(s<e.s0-r||s>e.s1+r)&&(Of(e,o,Math.round(Math.max(0,Math.min(1,(s-e.s0)/(e.s1-e.s0)))*(e.pos.length-2)),40,i),i.dist<kf(e,i)*.995))return!1;return!0}}function Mb(e,t){let n={index:0,t:0,s:0,point:new W,dist:1/0};return(r,i)=>(tf(e,i,Db(e,wf(t,t.s[r])),40,n),n.dist>=e.radius*.995)}var Nb=(e,t)=>(e.branches??[]).some(e=>{let n=(e.s1-e.s0)/e.length;return t>=e.s0&&t<=e.s0+e.open0*n||t>=e.s0+e.open1*n&&t<=e.s1});function Pb(e){let t=new on;e.add(t);let n=Ev({vertexColors:!0,side:2}),r=Ev({side:2}),i=new br({transparent:!0,opacity:.35,depthWrite:!1}),a=new br({vertexColors:!1}),o=new br,s=new q,c=new q,l=[];return id(()=>{let e=Z.value,u=sb.value;s.set(ub.value),c.set(db.value),fb.value;let d=pb.value;for(let e of l.splice(0))e.dispose();t.clear();let f=e.radius,p=e.branches??[],m=u===`tube`||u===`halfpipe`||u===`rails`?jb(e):void 0,h=e=>[s,e.kind===`hidden`?c:new q(ab[e.kind].value)],g;if(u===`tube`||u===`halfpipe`){let t=u===`tube`?Tb(32,0,Math.PI*2,!1):Tb(17,Math.PI,Math.PI*2,!0),n=u===`tube`,r=[Cb(e,t,f,n,void 0,!0,m)];for(let i of p)r.push({...Cb(i,t,i.rad,n,void 0,!1,Mb(e,i)),colors:h(i)});g=wb(r,s,c)}else if(u===`rails`){let t=[];for(let n of[e,...p]){let r=n===e?null:n,i=r?r.rad:null;for(let a of[.25,.75,1.25,1.75]){let o=a*Math.PI,s=Cb(n,Tb(8,0,Math.PI*2,!1),.6,!0,(e,t)=>{let r=i?i[e]:f;t.copy(n.pos[e]).addScaledVector(n.right[e],Math.cos(o)*r).addScaledVector(n.up[e],Math.sin(o)*r)},!r,r?Mb(e,r):m);t.push(r?{...s,colors:h(r)}:s)}}g=wb(t,s,c)}if(g){let e=new Mr(g,n);t.add(e),l.push(g)}let _=[];for(let r of e.sections??[]){if(r.kind===`open`){for(let e=r.s0+d/2;e<r.s1;e+=d)_.push(e);continue}let i=Ab(e,r,s,c);t.add(new Mr(i,n)),l.push(i)}if(_.length){let n=new Ja(f,.3,6,40),r=new Wr(n,i,_.length);Eb(r,e,_,e.length),t.add(r),l.push(n,r)}if(u===`gates`||u===`rails`||u===`open`){let n=Tb(Math.max(1,Math.floor(e.length/d)),0,e.length,!1).filter(t=>!Nb(e,t)&&!qf(e,t)),a=p.map(e=>Tb(Math.max(1,Math.floor(e.length/d)),e.open0,e.open1,!0)),o=new Ja(f,u===`open`?.3:1,6,40),s=new Wr(o,u===`open`?i:r,n.length+a.reduce((e,t)=>e+t.length,0));Eb(s,e,n,e.length);let c=n.length;p.forEach((e,t)=>{Eb(s,e,a[t],e.length,t=>e.rad[t]/f,c),c+=a[t].length}),t.add(s),l.push(o,s)}for(let e of p){if(e.kind===`hidden`)continue;let n=new br({color:new q(ab[e.kind].value).multiplyScalar(gb.value)}),r=new Ja(e.radius*.97,.9,6,48),i=new Wr(r,n,1);Eb(i,e,[e.open0],e.length,t=>e.rad[t]/e.radius),t.add(i),l.push(r,i,n)}let v=new Ja(f*.98,.5,6,48),y=new Wr(v,a,Math.max(1,e.checkpoints.length-1));Eb(y,e,e.checkpoints.slice(1),e.length),y.count=e.checkpoints.length-1;let b=new Wr(new Ja(f*.98,.6,6,48),o,1);Eb(b,e,[0],e.length),t.add(y,b),l.push(v,y,b.geometry,b)}),{group:t,update(){t.visible=Qy(),r.color.set(db.value),i.color.set(db.value),a.color.set(mb.value).multiplyScalar(gb.value),o.color.set(hb.value).multiplyScalar(gb.value)}}}var Fb=[`world`,`scenery`],Ib={kinds:X.str(`world.scenery.kinds`,``,{tags:Fb,regen:!0,desc:`comma-separated: ${Vv.join(`, `)}`}),count:X.int(`world.scenery.count`,120,{min:0,max:600,hardMin:0,hardMax:5e3,tags:Fb,regen:!0,desc:`props per kind (ribs and halos a tenth)`}),size:X.num(`world.scenery.size`,60,{min:5,max:300,hardMin:1,unit:`m`,tags:Fb,regen:!0,desc:`typical prop size`}),spread:X.num(`world.scenery.spread`,700,{min:0,max:3e3,hardMin:0,unit:`m`,tags:Fb,regen:!0,desc:`how far props spread from the corridor`}),clearance:X.num(`world.scenery.clearance`,1.6,{min:1.1,max:4,hardMin:1.01,unit:`× tube`,tags:Fb,regen:!0,desc:`props keep this far from the centreline`}),ground:X.enum(`world.ground`,`none`,Hv,{tags:Fb,regen:!0,desc:`a floor below the track, a ceiling above it, or both`}),gap:X.num(`world.ground.gap`,200,{min:0,max:2e3,hardMin:0,unit:`m`,tags:Fb,regen:!0,desc:`space between the track and the floor / ceiling`})},Lb=[`world`,`scenery`,`render`],Rb=X.color(`world.scenery.color`,`#6f5fa8`,{tags:Lb}),zb=X.color(`world.scenery.color2`,`#c9b8e8`,{tags:Lb,desc:`props mix between the two colours`}),Bb=X.color(`world.scenery.glow`,`#7fe7ff`,{tags:Lb,desc:`halos`}),Vb=X.num(`world.scenery.glowStrength`,1.6,{min:0,max:6,hardMin:0,tags:Lb,desc:`above the bloom threshold halos glow`}),Hb=X.color(`world.ground.color`,`#2b2050`,{tags:Lb}),Ub=X.color(`world.ground.color2`,`#3b2d6b`,{tags:Lb,desc:`alternate bands of the floor and ceiling`}),Wb=X.num(`world.ground.band`,400,{min:20,max:4e3,hardMin:1,unit:`m`,tags:Lb,regen:!0,desc:`width of the concentric floor bands`}),Gb=$u(()=>({seed:Sb.value,kinds:Ib.kinds.value.split(`,`).map(e=>e.trim()).filter(e=>Vv.includes(e)),count:Ib.count.value,size:Ib.size.value,spread:Ib.spread.value,ground:Ib.ground.value,gap:Ib.gap.value,clearance:Ib.clearance.value})),Kb=$u(()=>ey(Z.value,Gb.value));function qb(e){switch(e){case`spires`:return new Ua(1,0);case`monoliths`:case`lattice`:return new bi(1,1,1);case`peaks`:return new Si(1,2,7,1);case`orbs`:return new Ha(1,2);case`shards`:return new qa(1,0);case`columns`:return new xi(1,1,2,10,1);case`ribs`:return new Ja(1,Uv.ribTube,6,40,Uv.ribArc).rotateZ(-(Uv.ribArc-Math.PI)/2);case`halos`:return new Ja(1,Uv.haloTube,6,64)}}function Jb(e,t,n,r,i,a){let o=new Ga(0,n,64,Math.min(200,Math.max(2,Math.ceil(n/r)))).rotateX(-Math.PI/2).translate(e.x,t,e.z),s=o.toNonIndexed();o.dispose();let c=s.getAttribute(`position`),l=new Float32Array(c.count*3);for(let t=0;t<c.count;t+=3){let n=0;for(let r=0;r<3;r++)n+=Math.hypot(c.getX(t+r)-e.x,c.getZ(t+r)-e.z)/3;let o=Math.floor(n/r)%2?a:i;for(let e=0;e<3;e++)o.toArray(l,(t+e)*3)}return s.setAttribute(`color`,new qn(l,3)),s.computeVertexNormals(),s}function Yb(e){let t=new on;e.add(t);let n=Ev(),r=Ev({vertexColors:!0,side:2}),i=new br,a=[],o=new q,s=new q,c=new q,l=new K;return id(()=>{let e=Kb.value;o.set(Rb.value),s.set(zb.value);let u=new q(Hb.value),d=new q(Ub.value),f=Wb.value;for(let e of a.splice(0))e.dispose();t.clear();for(let r of Vv){let u=e.props.filter(e=>e.kind===r);if(!u.length)continue;let d=qb(r),f=new Wr(d,r===`halos`?i:n,u.length);u.forEach((e,t)=>{f.setMatrixAt(t,l.compose(e.pos,e.quat,e.scale)),r!==`halos`&&f.setColorAt(t,c.copy(o).lerp(s,e.tint))}),f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0),f.computeBoundingSphere(),t.add(f),a.push(d,f)}let p=e.extent+6e3;for(let n of[e.floorY,e.ceilY]){if(n===null)continue;let i=Jb(e.centre,n,p,f,u,d);t.add(new Mr(i,r)),a.push(i)}}),{group:t,update(){t.visible=Qy(),i.color.set(Bb.value).multiplyScalar(Vb.value)}}}var Xb=new K,Zb=new W,Qb=new W,$b=new W;function ex(e){let t=e.height/2,n=Math.max(1,Math.ceil(e.width/e.height));Zb.set(1,0,0).applyQuaternion(e.quat);let r=[];for(let i=0;i<=n;i++)r.push({c:e.pos.clone().addScaledVector(Zb,-e.width/2+e.width*i/n),r:t*1.05});return r}function tx(e,t){if(t.count<=0)return[];let n=Fd(t.seed*131+3),r=new Wv(e),i=e.radius,a=e.length,o=e.pos.length,s=t.width,c=s*9/16,l=t=>{let n=qf(e,t);return!!n&&n.kind!==`open`},u=[];for(let d=0;d<t.count;d++)for(let f=0;f<16;f++){let f=(d+.25+n()*.5)/t.count*a,p=(f+(250+n()*250))%a;if(l(f)||l(p))continue;let m=Math.min(o-1,Math.floor(p/a*o)),h=n()<.5?-1:1,g=(n()*2-1)*.6,_=i*t.clearance+s*.6+n()*s*.5,v=Qb.copy(e.right[m]).multiplyScalar(h).addScaledVector(e.up[m],g).normalize(),y=e.pos[m].clone().addScaledVector(v,_).addScaledVector(e.up[m],c*.3),b=Math.min(o-1,Math.floor(f/a*o));if($b.subVectors(e.pos[b],y).normalize(),Zb.crossVectors(e.up[m],$b),Zb.lengthSq()<1e-6)continue;Zb.normalize(),Qb.crossVectors($b,Zb);let x={pos:y,quat:new lt().setFromRotationMatrix(Xb.makeBasis(Zb,Qb,$b)),width:s,height:c,s:f};if(ex(x).every(e=>r.isClear(e.c,e.r,t.clearance))){u.push(x);break}}return u}var nx=[`render`,`sky`],rx=X.color(`render.background`,`#05010f`,{tags:nx,desc:`sky colour at the horizon`}),ix=X.color(`render.sky.zenith`,`#1a0b3d`,{tags:nx}),ax=X.int(`render.sky.bands`,5,{min:1,max:16,hardMin:1,hardMax:64,tags:nx,desc:`flat colour bands between horizon and zenith`}),ox=X.bool(`render.stars.enabled`,!0,{tags:[`render`,`stars`]}),sx=X.int(`render.stars.count`,2500,{min:0,max:2e4,hardMin:0,hardMax:2e5,tags:[`render`,`stars`],regen:!0}),cx=X.num(`render.stars.size`,2,{min:.5,max:8,hardMin:.1,unit:`px`,tags:[`render`,`stars`]}),lx=X.num(`render.stars.brightness`,1.6,{min:0,max:4,hardMin:0,tags:[`render`,`stars`],desc:`above ~1.2 the brightest stars bloom`}),ux=[`render`,`sky`,`planet`],dx={size:X.num(`render.sky.planet.size`,0,{min:0,max:60,hardMin:0,hardMax:85,unit:`°`,tags:ux,desc:`angular radius of a planet in the sky; 0 = none`}),dir:X.vec3(`render.sky.planet.dir`,[-.6,.35,-.7],{tags:ux,desc:`direction towards the planet`}),color:X.color(`render.sky.planet.color`,`#ff9f6b`,{tags:ux}),color2:X.color(`render.sky.planet.color2`,`#c2577a`,{tags:ux,desc:`its stripes`}),stripes:X.int(`render.sky.planet.stripes`,7,{min:0,max:30,hardMin:0,hardMax:200,tags:ux,desc:`latitude bands`}),tilt:X.num(`render.sky.planet.tilt`,.35,{min:-1.6,max:1.6,unit:`rad`,tags:ux,desc:`axial tilt of the bands and ring`}),ring:X.num(`render.sky.planet.ring`,2.2,{min:0,max:4,hardMin:0,tags:ux,desc:`outer ring radius in planet radii; 0 (or below 1.2) = no ring`}),ringColor:X.color(`render.sky.planet.ringColor`,`#ffe0b0`,{tags:ux}),moons:X.int(`render.sky.moons`,0,{min:0,max:8,hardMin:0,hardMax:40,tags:ux,desc:`small moons scattered across the sky`}),moonColor:X.color(`render.sky.moonColor`,`#e8e4ff`,{tags:ux})},fx=X.int(`render.stars.seed`,7,{min:0,max:99999,hardMin:0,tags:[`render`,`stars`],regen:!0});function px(e){let t=new on;t.layers.set(1),e.add(t);let n=new ao({uniforms:{horizon:{value:new q},zenith:{value:new q},bands:{value:5}},vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position.z = gl_Position.w; // pin to the far plane
      }`,fragmentShader:`
      uniform vec3 horizon;
      uniform vec3 zenith;
      uniform float bands;
      varying vec3 vDir;
      void main() {
        float t = abs(normalize(vDir).y);
        t = floor(t * bands) / max(bands - 1.0, 1.0);
        gl_FragColor = vec4(mix(horizon, zenith, clamp(t, 0.0, 1.0)), 1.0);
        #include <colorspace_fragment>
      }`,side:1,depthWrite:!1}),r=new Mr(new Ka(10,32,16),n);r.layers.set(1),r.renderOrder=-2,r.frustumCulled=!1,t.add(r);let i=new ao({uniforms:{size:{value:2},bright:{value:1},pixelRatio:{value:1}},vertexShader:`
      attribute float mag;
      attribute vec3 tint;
      uniform float size;
      uniform float pixelRatio;
      uniform float bright;
      varying vec3 vColor;
      void main() {
        vColor = tint * bright * mag;
        gl_PointSize = size * pixelRatio * (0.5 + mag);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position.z = gl_Position.w;
      }`,fragmentShader:`
      varying vec3 vColor;
      void main() {
        // hard-edged disc: toon stars, no soft falloff
        if (length(gl_PointCoord - 0.5) > 0.5) discard;
        gl_FragColor = vec4(vColor, 1.0);
      }`,depthWrite:!1}),a;id(()=>{let e=sx.value,n=Fd(fx.value),r=new Float32Array(e*3),o=new Float32Array(e),s=new Float32Array(e*3),c=new W,l=new q;for(let t=0;t<e;t++){do c.set(n()*2-1,n()*2-1,n()*2-1);while(c.lengthSq()>1||c.lengthSq()<1e-4);c.setLength(9).toArray(r,t*3),o[t]=n()**3,l.setHSL(.55+n()*.15,.6,.85).toArray(s,t*3)}a&&(t.remove(a),a.geometry.dispose());let u=new cr;u.setAttribute(`position`,new qn(r,3)),u.setAttribute(`mag`,new qn(o,1)),u.setAttribute(`tint`,new qn(s,3)),a=new pi(u,i),a.layers.set(1),a.renderOrder=-1,a.frustumCulled=!1,t.add(a)});let o=new ao({uniforms:{colorA:{value:new q},colorB:{value:new q},stripes:{value:7},sun:{value:new W(1,1,1)}},vertexShader:`
      varying vec3 vNormal;
      varying vec3 vLocal;
      void main() {
        vLocal = position;
        vNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position.z = gl_Position.w;
      }`,fragmentShader:`
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform float stripes;
      uniform vec3 sun;
      varying vec3 vNormal;
      varying vec3 vLocal;
      void main() {
        float band = stripes > 0.0 ? step(0.5, fract((vLocal.y * 0.5 + 0.5) * stripes + 0.15 * sin(vLocal.x * 6.0))) : 0.0;
        vec3 c = mix(colorA, colorB, band);
        float lit = dot(normalize(vNormal), normalize(sun));
        c *= lit > 0.35 ? 1.0 : lit > -0.15 ? 0.62 : 0.3; // three flat bands, like the toon ramp
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`,depthWrite:!1,depthTest:!1}),s=new br({side:2,depthWrite:!1,depthTest:!1,transparent:!0,opacity:.85}),c=o.clone(),l=new on;return l.layers.set(1),t.add(l),id(()=>{for(let e of l.children.splice(0))e.geometry.dispose();let e=dx.size.value,t=Fd(fx.value+1),n=(e,t,n)=>{let r=new Mr(e,t);return r.layers.set(1),r.renderOrder=n,r.frustumCulled=!1,l.add(r),r};if(e>0){let t=new W().fromArray(dx.dir.value).normalize();t.lengthSq()<.5&&t.set(0,1,0);let r=8*Math.tan(Math.min(e,85)*Math.PI/180),i=t.clone().multiplyScalar(8),a=new W().crossVectors(t,new W(0,1,0));a.lengthSq()<1e-6&&a.set(1,0,0),a.normalize();let c=new lt().setFromAxisAngle(t,dx.tilt.value).multiply(new lt().setFromAxisAngle(a,-.35)),l=dx.ring.value;if(l>=1.2){let e=t.clone().negate().applyQuaternion(c.clone().invert()),a=Math.atan2(-e.z,e.x);for(let e of[!1,!0]){let t=a+(e?-Math.PI/2:Math.PI/2),o=n(new Ga(r*1.25,r*l,64,3,t,Math.PI).rotateX(-Math.PI/2),s,e?-.7:-.9);o.position.copy(i),o.quaternion.copy(c)}}let u=n(new Ka(r,48,32),o,-.8);u.position.copy(i),u.quaternion.copy(c)}for(let e=0;e<dx.moons.value;e++){let e=new W(t()*2-1,t()*.9+.05,t()*2-1).normalize();n(new Ka(8*Math.tan((.6+t()*2.4)*(Math.PI/180)),20,14),c,-.85).position.copy(e.multiplyScalar(8.2))}}),{update(e,r){t.position.copy(e.position),n.uniforms.horizon.value.set(rx.value),n.uniforms.zenith.value.set(ix.value),n.uniforms.bands.value=ax.value,i.uniforms.size.value=cx.value,i.uniforms.bright.value=lx.value,i.uniforms.pixelRatio.value=r,a&&(a.visible=ox.value),o.uniforms.colorA.value.set(dx.color.value),o.uniforms.colorB.value.set(dx.color2.value),o.uniforms.stripes.value=dx.stripes.value;let l=X.get(`render.light.dir`)?.value;Array.isArray(l)&&(o.uniforms.sun.value.fromArray(l),c.uniforms.sun.value.fromArray(l)),c.uniforms.colorA.value.set(dx.moonColor.value),c.uniforms.colorB.value.set(dx.moonColor.value),c.uniforms.stripes.value=0,s.color.set(dx.ringColor.value)}}}function mx(e){return`${e<0?`−`:`+`}${Math.abs(e).toFixed(2)}`}function hx(e){let t=e%100;return`${e}${t>=11&&t<=13?`th`:[`th`,`st`,`nd`,`rd`][e%10]??`th`}`}function gx(e,t){return t>0?`LAP ${Math.min(e,t)}/${t}`:`LAP ${e}`}var _x=e=>e.replace(/[&<>"]/g,e=>`&#${e.charCodeAt(0)};`);function vx(e){if(e===null)return`–:––.–––`;let t=Math.floor(e/60);return`${t}:${(e-t*60).toFixed(3).padStart(6,`0`)}`}function yx(e){let t=e.lapTimes.indexOf(Math.min(...e.lapTimes)),n=e.lapTimes.map((e,n)=>`<li${n===t?` class="best"`:``}><span>LAP ${n+1}</span><span>${vx(e)}</span></li>`).join(``),r=[{name:`YOU`,time:e.finishTime??0,you:!0},...e.rivalTimes.map(e=>({...e,you:!1}))].sort((e,t)=>e.time-t.time),i=r.findIndex(e=>e.you)+1;return`
    <h2>${r.length>1?`${hx(i)} of ${r.length}`:`Finished`}</h2>
    <div class="total">${vx(e.finishTime)}</div>
    <ol class="laps">${n}</ol>
    ${r.length>1?`<ol class="order">${r.map(e=>`<li${e.you?` class="you"`:``}><span>${_x(e.name)}</span><span>${vx(e.time)}</span></li>`).join(``)}</ol>`:``}
    <p class="again"></p>`}function bx(e){let t=e.result===`clear`,n=e.weights,r=t?e.timeLeft:0,i=(e,t,n)=>`<li><span>${e}</span><span>${t}</span><b>${Math.round(n)}</b></li>`,a=[e.newBest?`<li class="best">NEW BEST</li>`:``,e.badge?`<li class="badge">${_x((e.ship??``).toUpperCase())} BADGE EARNED</li>`:``,!e.ship&&t?`<li>custom ship: no badge</li>`:``].join(``);return`
    <h2>${t?`Level ${e.level} cleared`:`Out of time`}</h2>
    <div class="total">${e.score}</div>
    <ol class="breakdown">
      ${i(`TIME LEFT`,`${r.toFixed(1)} s`,r*n.time)}
      ${i(`GATES`,`${e.hits}/${e.gates}`,e.hits*n.gate)}
      ${i(`BEACONS`,`${e.collected}/${e.beacons}`,e.collected*n.beacon)}
    </ol>
    ${e.misses?`<p class="missed">${e.misses} gate${e.misses>1?`s`:``} missed</p>`:``}
    ${a?`<ol class="notes">${a}</ol>`:``}
    <p class="again"></p>`}function xx(){let e=document.createElement(`div`);e.id=`hud`,e.innerHTML=`
    <div class="hint"></div>
    <div class="row"><b class="speed">0</b><span>m/s</span></div>
    <div class="bar"><i></i></div>
    <div class="row small"><span class="fa"></span><span class="cam"></span><span class="cruise"></span></div>`,document.body.appendChild(e);let t=document.createElement(`div`);t.id=`race-hud`,t.innerHTML=`
    <div class="time">0:00.000</div>
    <div class="row small"><span class="lap"></span><span class="cp"></span><span class="delta"></span></div>
    <div class="row small"><span class="last"></span><span class="best"></span><span class="total"></span><span class="seed"></span></div>
    <div class="route" hidden></div>
    <div class="oob" hidden></div>`,document.body.appendChild(t);let n=document.createElement(`div`);n.id=`standings`,n.innerHTML=`<div class="pos"></div><ol></ol>`,document.body.appendChild(n);let r=n.querySelector(`.pos`),i=n.querySelector(`ol`),a=``,o=document.createElement(`div`);o.id=`results`,o.hidden=!0,document.body.appendChild(o);let s=null,c=e=>t.querySelector(e),l=c(`.time`),u=c(`.lap`),d=c(`.cp`),f=c(`.delta`),p=c(`.last`),m=c(`.best`),h=c(`.seed`),g=c(`.total`),_=c(`.oob`),v=c(`.route`),y=t=>e.querySelector(t),b=y(`.speed`),x=y(`.bar i`),S=y(`.fa`),C=y(`.cam`),w=y(`.cruise`),T=y(`.hint`);return{elements:{speed:e,timer:t,standings:n},update(e,c){let y=c.race;t.hidden=!y,y||(s=null);let E=y?.proving??null;y&&E?(l.textContent=!y.started&&!E.result?`cross the line`:vx(E.timeLeft),l.classList.toggle(`low`,y.started&&!E.result&&E.timeLeft<10),u.textContent=`LEVEL ${E.level}`,d.textContent=`GATES ${E.hits}/${E.gates}`,f.textContent=E.misses?`MISSED ${E.misses}`:``,f.className=`delta behind`,p.textContent=`BEACONS ${E.collected}/${E.beacons}`,m.textContent=E.best===null?``:`BEST ${E.best}`,h.textContent=E.ship?E.ship.toUpperCase():`CUSTOM`,g.textContent=``):y&&(l.classList.remove(`low`),l.textContent=y.finished?vx(y.finishTime):y.started?vx(y.lapTime):`cross the line`,u.textContent=y.finished?`FINISHED`:y.started?gx(y.lap,y.laps):``,d.textContent=y.started&&!y.finished?`CP ${y.checkpoint}/${y.checkpoints}`:``,f.textContent=y.delta===null?``:`${y.delta<0?`−`:`+`}${Math.abs(y.delta).toFixed(2)}`,f.className=`delta ${y.delta!==null&&y.delta<0?`ahead`:`behind`}`,p.textContent=`LAST ${vx(y.lastLap)}`,m.textContent=`BEST ${vx(y.bestLap)}`,h.textContent=`SEED ${y.seed}`,g.textContent=y.laps>0&&y.started&&!y.finished?`TOTAL ${vx(y.raceTime)}`:``);let D=y&&!y.finished?y.route??null:null;v.hidden=!D,D&&v.textContent!==D.text&&(v.textContent=D.text,v.style.color=D.color),_.hidden=!y||y.oob===null,y&&y.oob!==null&&(_.textContent=`OUT OF BOUNDS ${y.oob.toFixed(1)}`);let O=y?.standings??null;if(n.hidden=!O,O){r.innerHTML=`<b>${O.position}</b>/${O.of}`;let e=O.rivals.map(e=>e.name).join(`|`)+O.position;if(e!==a){a=e;let t=O.rivals.map(e=>`<li><span>${_x(e.name)}</span><i></i></li>`);t.splice(O.position-1,0,`<li class="you"><span>YOU</span><i></i></li>`),i.innerHTML=t.join(``)}let t=0;for(let e of i.children){if(e.classList.contains(`you`))continue;let n=O.rivals[t++].gap,r=e.querySelector(`i`);r.textContent=mx(n),r.className=n<0?`ahead`:`behind`}}let ee=!!y?.finished;o.hidden=!ee,y&&ee&&s!==y.finishTime&&(s=y.finishTime,o.innerHTML=y.proving?bx(y.proving):yx(y)),ee&&(o.querySelector(`.again`).textContent=c.again),b.textContent=e.vel.length().toFixed(0),x.style.width=`${(e.energy*100).toFixed(1)}%`,x.classList.toggle(`on`,e.boosting),x.classList.toggle(`locked`,e.boostLocked),S.textContent=c.assist?`ASSIST`:`NEWTONIAN`,S.classList.toggle(`off`,!c.assist),C.textContent=c.cam.toUpperCase(),w.textContent=c.cruise>0?`CRUISE ${Math.round(c.cruise*100)}%`:``,T.textContent=c.hint}}}function Sx(e){if(!e||!e.started)return null;let t=e.standings,n=``;if(t?.rivals.length){let e=t.rivals.filter(e=>e.gap<0),r=e.length?e[e.length-1]:t.rivals[0];n=`${mx(-r.gap)} ${r.name.toUpperCase()}`}let r=e.finished?e.finishTime??e.raceTime:e.laps>0?e.raceTime:e.lapTime;return{tag:t?`P${t.position}/${t.of}`:`LIVE`,lap:e.finished?`FINISH`:gx(e.lap,e.laps),gap:n,time:vx(r)}}function Cx(e,t,n){let{width:r,height:i}=e.canvas;if(e.clearRect(0,0,r,i),!t)return;let a=i*.14,o=i-a-i*.06,s=r*.04;e.font=`700 ${Math.round(a*.62)}px system-ui, sans-serif`,e.textBaseline=`middle`;let c=[t.tag,t.lap,t.gap,t.time].filter(Boolean),l=a*.35,u=c.map(t=>e.measureText(t).width+l*2),d=s;c.forEach((t,r)=>{e.fillStyle=r===0?n:`rgba(250, 250, 252, 0.92)`,e.fillRect(d,o,u[r],a),e.fillStyle=r===0?`#ffffff`:`#1a1a24`,e.fillText(t,d+l,o+a/2),d+=u[r]+a*.12})}var wx=[`world`,`screens`],Tx={count:X.int(`world.screens.count`,0,{min:0,max:16,hardMin:0,hardMax:64,tags:wx,regen:!0,desc:`race mode: giant screens beside the track showing a broadcast view of your ship`}),width:X.num(`world.screens.width`,160,{min:20,max:600,hardMin:1,unit:`m`,tags:wx,regen:!0})},Ex=X.int(`world.screens.res`,320,{min:64,max:1024,hardMin:16,hardMax:2048,unit:`px`,tags:[...wx,`perf`],desc:`width of the picture they show`}),Dx=X.num(`world.screens.fps`,15,{min:1,max:60,hardMin:.5,unit:`Hz`,tags:[...wx,`perf`],desc:`how often the picture updates`}),Ox=X.num(`world.screens.brightness`,1.15,{min:0,max:3,hardMin:0,tags:wx,desc:`above the bloom threshold the screens glow`}),kx=X.color(`world.screens.frame`,`#1d1b26`,{tags:[...wx,`render`]}),Ax=X.bool(`world.screens.overlay`,!0,{tags:wx,desc:`place, lap, gap and clock along the bottom of the picture`}),jx=X.color(`world.screens.accent`,`#e2304a`,{tags:[...wx,`render`],desc:`colour behind the place on the overlay`}),Mx=$u(()=>Zy.value===`race`?tx(Z.value,{seed:Sb.value,count:Tx.count.value,width:Tx.width.value,clearance:1.6}):[]);function Nx(e){let t=new on;e.add(t);let n=Ev(),r=new br({toneMapped:!1}),i=null,a=new Uo(50,16/9,.5,12e3);a.layers.enable(1);let o=y_(7331),s=[],c=1/0,l=document.createElement(`canvas`);l.width=640,l.height=360;let u=l.getContext(`2d`),d=new gi(l);d.colorSpace=Le;let f=new br({map:d,transparent:!0,toneMapped:!1,depthWrite:!1}),p=null,m=``;return id(()=>{let e=Mx.value;for(let e of s.splice(0))e.dispose();if(t.clear(),p=null,!e.length)return;let i=new Wa(1,1),a=new bi(1,1,1),o=new Wr(i,r,e.length),c=new Wr(a,n,e.length);p=new Wr(i,f,e.length),p.renderOrder=3;let l=new K,u=new W,d=new W;e.forEach((e,t)=>{o.setMatrixAt(t,l.compose(e.pos,e.quat,new W(e.width,e.height,1))),d.set(0,0,e.height*.01).applyQuaternion(e.quat).add(e.pos),p.setMatrixAt(t,l.compose(d,e.quat,new W(e.width,e.height,1))),u.set(0,0,-e.height*.04).applyQuaternion(e.quat).add(e.pos),c.setMatrixAt(t,l.compose(u,e.quat,new W(e.width*1.06,e.height*1.1,e.height*.06)))}),t.add(o,c,p),s.push(i,a,o,c,p)}),{group:t,update(e,s,l,f,h,g=null){let _=Qy()&&Mx.value.length>0;if(t.visible=_,n.color.set(kx.value),r.color.setScalar(Ox.value),c+=l,!_||(R_(a,s,l,o,50),c<1/Dx.value))return;c=0;let v=Ax.value?Sx(g):null,y=v?`${v.tag}|${v.lap}|${v.gap}|${v.time}|${jx.value}`:``;y!==m&&u&&(m=y,Cx(u,v,jx.value),d.needsUpdate=!0),p&&(p.visible=!1);let b=Math.max(16,Math.round(Ex.value)),x=Math.round(b*9/16);(!i||i.width!==b)&&(i?.dispose(),i=new kt(b,x,{colorSpace:Le}),r.map=i.texture,r.needsUpdate=!0),a.aspect=16/9,a.updateProjectionMatrix();let S=e.getRenderTarget();f.update(a,1),e.setRenderTarget(i),e.render(t.parent,a),e.setRenderTarget(S),p&&(p.visible=!!v),f.update(h,e.getPixelRatio())}}}var Px=X.num(`ship.radius`,1.5,{min:.2,max:6,hardMin:.05,unit:`m`,tags:[`ship`,`race`],desc:`collision sphere`}),Fx=X.num(`race.nearMiss`,2.5,{min:0,max:10,hardMin:0,unit:`m`,tags:[`race`,`juice`],desc:`passing an obstacle with less than this to spare counts as a near miss`}),Ix=[`gen`,`gauntlet`],Lx={chunkLength:X.num(`gen.gauntlet.chunkLength`,140,{min:40,max:400,hardMin:20,unit:`m`,tags:Ix,regen:!0,desc:`track length per obstacle chunk`}),lead:X.num(`gen.gauntlet.lead`,200,{min:0,max:1e3,hardMin:0,unit:`m`,tags:Ix,regen:!0,desc:`clear run-up after the start line`}),rampStart:X.num(`gen.gauntlet.rampStart`,.1,{min:0,max:1,hardMin:0,hardMax:1,tags:Ix,regen:!0,desc:`difficulty of the first chunk`}),rampEnd:X.num(`gen.gauntlet.rampEnd`,1,{min:0,max:1,hardMin:0,hardMax:1,tags:Ix,regen:!0,desc:`difficulty of the last chunk`}),minClearance:X.num(`gen.gauntlet.minClearance`,1.8,{min:1.1,max:6,hardMin:1.05,unit:`× ship`,tags:Ix,regen:!0,desc:`tightest gap at full difficulty, in ship radii`})},Rx=np.map(e=>[e,X.bool(`gen.gauntlet.kinds.${e}`,!0,{tags:Ix,regen:!0})]),zx=[`render`,`gauntlet`],Bx=X.color(`render.gauntlet.color`,`#ff7a3d`,{tags:zx}),Vx=X.color(`render.gauntlet.trim`,`#2a2440`,{tags:zx}),Hx=X.color(`render.gauntlet.laser`,`#ff2f5a`,{tags:zx}),Ux=X.num(`render.gauntlet.laserGlow`,2.5,{min:0,max:8,hardMin:0,tags:zx,desc:`above the bloom threshold lasers glow`}),Wx=X.color(`render.gauntlet.rock`,`#8b86a8`,{tags:zx}),Gx=$u(()=>({seed:Sb.value,chunkLength:Lx.chunkLength.value,lead:Lx.lead.value,rampStart:Lx.rampStart.value,rampEnd:Lx.rampEnd.value,minClearance:Lx.minClearance.value,shipRadius:Px.value,kinds:Rx.filter(([,e])=>e.value).map(([e])=>e)})),Kx=[`gen`,`race`,`hazard`],qx={count:X.int(`gen.race.hazards`,0,{min:0,max:16,hardMin:0,hardMax:64,tags:Kx,regen:!0,desc:`race mode: obstacles round the lap (apertures, shutters...) clear of forks and shaped sections`}),kinds:X.str(`gen.race.hazardKinds`,`iris,shutter`,{tags:Kx,regen:!0,desc:`comma-separated, used in turn: ${rp.join(`, `)}`}),difficulty:X.num(`gen.race.hazardDifficulty`,.5,{min:0,max:1,hardMin:0,hardMax:1,tags:Kx,regen:!0,desc:`how tight the gaps get and how fast hazards move`})},Jx=$u(()=>({seed:Sb.value,count:Zy.value===`race`?qx.count.value:0,kinds:qx.kinds.value.split(`,`).map(e=>e.trim()).filter(e=>rp.includes(e)),difficulty:qx.difficulty.value,minClearance:Lx.minClearance.value,shipRadius:Px.value})),Yx=$u(()=>{if(Zy.value===`gauntlet`)return dp(Z.value,Gx.value);if(Jx.value.count>0&&Zy.value===`race`){let e=fp(Z.value,Jx.value);return e.planes.length?e:null}return null}),Xx=Math.PI*2;function Zx(e,t,n,r,i,a){let o=new on,s=e.shape,c=(e,t,n=0,r=0,i=0)=>{let s=new Mr(e,t);return s.position.set(n,r,0),s.rotation.z=i,o.add(s),a.push(e),s},l=()=>{};if(s.k===`hole`){let i=new ta().absarc(0,0,t,0,Xx,!1);i.holes.push(new ea().absarc(s.r,0,s.gap,0,Xx,!0));let a=new za(i,{depth:e.thickness,bevelEnabled:!1,curveSegments:40});a.translate(0,0,-e.thickness/2),c(a,n),c(new Ja(s.gap,.35,6,32),r,s.r,0),l=e=>void(o.rotation.z=s.a0+s.omega*e)}else if(s.k===`slot`){o.rotation.z=s.angle;let i=[-1,1].map(i=>c(new bi(t,2*t,e.thickness),i<0?n:r));l=e=>{let n=sp(s,e);i[0].position.x=s.u0-n/2-t/2,i[1].position.x=s.u0+n/2+t/2}}else if(s.k===`iris`){let e=[];for(let t=0;t<s.petals;t++){let i=new cr,a=new qn(new Float32Array(42),3);i.setAttribute(`position`,a),i.setAttribute(`normal`,new qn(new Float32Array(42).map((e,t)=>+(t%3==2)),3));let o=[];for(let e=0;e<6;e++)o.push(e*2,e*2+1,e*2+2,e*2+1,e*2+3,e*2+2);i.setIndex(o),c(i,t%2?r:n).frustumCulled=!1,e.push(a)}c(new Ja(t*1.02,.8,6,48),r),l=n=>{let r=cp(s,n),i=.25+.5*(1-(r-s.min)/Math.max(1e-6,s.max-s.min));e.forEach((e,n)=>{for(let a=0;a<=6;a++){let o=(n+a/6)*Xx/s.petals;e.setXYZ(a*2,Math.cos(o+i)*r,Math.sin(o+i)*r,0),e.setXYZ(a*2+1,Math.cos(o)*t*1.03,Math.sin(o)*t*1.03,0)}e.needsUpdate=!0})}}else if(s.k===`beams`){for(let e=0;e<(s.crossed?2:1);e++){let n=e?s.oy:s.ox;for(let r=-s.count;r<s.count;r++){let a=n+(r+.5)*s.spacing;if(Math.abs(a)>=t)continue;let o=Math.sqrt(t*t-a*a),l=new xi(s.width/2,s.width/2,2*o,6);e===0?c(l,i,a,0):c(l,i,0,a,Math.PI/2)}}l=e=>void(o.rotation.z=s.a0+s.omega*e)}else{let t=c(new xi(s.hub,s.hub,e.thickness*2,16),r);t.rotation.x=Math.PI/2;let i=s.reach-s.hub;for(let t=0;t<s.n;t++){let r=Xx*t/s.n;c(new bi(i,s.width,e.thickness),n,Math.cos(r)*(s.hub+i/2),Math.sin(r)*(s.hub+i/2),r)}l=e=>void(o.rotation.z=s.a0+s.omega*e)}return l(0),{spin:o,update:l}}function Qx(e){let t=new on;e.add(t);let n=Ev({side:2}),r=Ev(),i=Ev(),a=new br,o=[],s=[],c=new K,l=new W;return id(()=>{let e=Yx.value,u=Z.value;for(let e of o.splice(0))e.dispose();if(t.clear(),s=[],e){for(let i of e.planes){let e=pp(u,i.s),d=new on;c.makeBasis(u.right[e],u.up[e],u.tan[e]).setPosition(mp(u,i.s,0,0,l)),d.applyMatrix4(c);let{spin:f,update:p}=Zx(i,u.radius,n,r,a,o);d.add(f),t.add(d),s.push(p)}if(e.rocks.length){let n=new Ha(1,0),r=new Wr(n,i,e.rocks.length),a=new lt,s=new Vt;e.rocks.forEach((e,t)=>{s.set(e.s*1.3,e.x*.7,e.y*.9),c.compose(mp(u,e.s,e.x,e.y,l),a.setFromEuler(s),new W(e.r,e.r,e.r)),r.setMatrixAt(t,c)}),r.instanceMatrix.needsUpdate=!0,t.add(r),o.push(n,r)}}}),{group:t,update(e){if(t.visible=Yx.value!==null,n.color.set(Bx.value),r.color.set(Vx.value),i.color.set(Wx.value),a.color.set(Hx.value).multiplyScalar(Ux.value),t.visible)for(let t of s)t(e)}}}var $x=[`gen`,`race`,`pad`],eS={boosts:X.int(`gen.race.boostPads`,0,{min:0,max:16,hardMin:0,hardMax:64,tags:$x,regen:!0,desc:`race mode: glowing strips along the wall that push you forward`}),slows:X.int(`gen.race.slowFields`,0,{min:0,max:12,hardMin:0,hardMax:64,tags:$x,regen:!0,desc:`race mode: murky stretches that drag you down, with a clear lane along one wall`}),boostLength:X.num(`gen.race.boostLength`,60,{min:10,max:300,hardMin:5,unit:`m`,tags:$x,regen:!0}),slowLength:X.num(`gen.race.slowLength`,160,{min:20,max:800,hardMin:5,unit:`m`,tags:$x,regen:!0})},tS=[`race`,`pad`],nS={accel:X.num(`race.pad.accel`,140,{min:0,max:600,hardMin:0,unit:`m/s²`,tags:tS,desc:`forward push over a boost strip`}),speed:X.num(`race.pad.speed`,230,{min:10,max:1200,hardMin:1,unit:`m/s`,tags:tS,desc:`boost strips push up to this speed`}),drag:X.num(`race.pad.drag`,1.1,{min:0,max:6,hardMin:0,unit:`/s`,tags:tS,desc:`drag inside a slow field`})},rS={perCavern:X.int(`gen.race.cavernMovers`,4,{min:0,max:12,hardMin:0,hardMax:40,tags:[`gen`,`race`,`section`],regen:!0,desc:`drifting slabs and falling rocks per cavern section`}),core:X.num(`gen.race.cavernCore`,.6,{min:.3,max:1.5,hardMin:.3,unit:`× tube`,tags:[`gen`,`race`,`section`],regen:!0,desc:`cavern movers never come closer to the centreline than this`})},iS=[`render`,`pad`],aS=X.color(`render.pad.boost`,`#3dffb0`,{tags:iS}),oS=X.num(`render.pad.glow`,2.2,{min:0,max:6,hardMin:0,tags:iS,desc:`above the bloom threshold boost strips glow`}),sS=X.color(`render.pad.slow`,`#6a4a8c`,{tags:iS}),cS=X.num(`render.pad.slowOpacity`,.45,{min:0,max:1,hardMin:0,hardMax:1,tags:iS}),lS=X.color(`render.mover.slab`,`#8a7a68`,{tags:[`render`,`mover`]}),uS=X.color(`render.mover.rock`,`#6b5a4a`,{tags:[`render`,`mover`]}),dS=$u(()=>({seed:Sb.value,boosts:Zy.value===`race`?eS.boosts.value:0,slows:Zy.value===`race`?eS.slows.value:0,boostLength:eS.boostLength.value,slowLength:eS.slowLength.value})),fS=$u(()=>{let e=dS.value;return!e.boosts&&!e.slows?[]:wp(Z.value,{...e,avoid:Yx.value?.planes.map(e=>e.s)})}),pS=$u(()=>{let e=Z.value.radius;return fS.value.map(t=>{let[n,r]=Sp(t,e);return{s0:t.s0,s1:t.s1,x:n,y:r,fast:!0}})}),mS=()=>({accel:nS.accel.value,speed:nS.speed.value,drag:nS.drag.value}),hS=$u(()=>({seed:Sb.value,perCavern:Zy.value===`race`?rS.perCavern.value:0,core:rS.core.value})),gS=$u(()=>Dp(Z.value,hS.value)),_S=Math.PI*2;function vS(e,t){let n=Z.value,r=[],i=[],a=new W,o=(e,t,r,i)=>{mp(n,e,r*Math.cos(t),r*Math.sin(t),a),i.push(a.x,a.y,a.z)},s=t*.985,c=t*.975;for(let t=e.s0;t<e.s1;t+=4){let n=Math.min(e.s1,t+4),[i,a]=[e.theta-e.half,e.theta+e.half];o(t,i,s,r),o(n,i,s,r),o(t,a,s,r),o(n,i,s,r),o(n,a,s,r),o(t,a,s,r)}let l=e.half*.8;for(let t=e.s0+4;t+8<e.s1;t+=12)for(let n of[-1,1]){let r=e.theta+n*l;o(t,r,c,i),o(t+5,e.theta,c,i),o(t+2.5,r,c,i),o(t+2.5,r,c,i),o(t+5,e.theta,c,i),o(t+7.5,e.theta,c,i)}let u=e=>{let t=new cr;return t.setAttribute(`position`,new Xn(e,3)),t};return{strip:u(r),arrows:u(i)}}function yS(e,t){let n=Z.value,r=Math.cos(e.theta),i=Math.sin(e.theta),a=t*.97,o=[];for(let t=0;t<32;t++){let n=a*Math.cos(t/32*_S),s=a*Math.sin(t/32*_S),c=n*r+s*i-e.w;c>0&&(n-=c*r,s-=c*i),o.push([n,s])}let s=[],c=new W,l=e=>o.map(([t,r])=>(mp(n,e,t,r,c),[c.x,c.y,c.z])),u=[],d=e=>{for(let t=0;t<32;t++)u.push(...e[t],...e[(t+1)%32])};for(let t=e.s0;t<e.s1;t+=40)d(l(t));d(l(e.s1));let f=l(e.s0),p=(...e)=>e.forEach(e=>s.push(...e)),m=(e,t)=>{let r=o.reduce((e,t)=>e+t[0],0)/32,i=o.reduce((e,t)=>e+t[1],0)/32;mp(n,t,r,i,c);let a=[c.x,c.y,c.z];for(let t=0;t<32;t++)p(a,e[t],e[(t+1)%32])};m(f,e.s0);for(let t=e.s0+6;;t+=6){let n=Math.min(e.s1,t),r=l(n);for(let e=0;e<32;e++){let t=(e+1)%32;p(f[e],r[e],f[t],f[t],r[e],r[t])}if(f=r,n>=e.s1)break}m(f,e.s1);let h=new cr;h.setAttribute(`position`,new Xn(s,3));let g=new cr;return g.setAttribute(`position`,new Xn(u,3)),{murk:h,edges:g}}function bS(e){let t=new on;e.add(t);let n=new br({side:2,transparent:!0,opacity:.8}),r=new br({side:2}),i=new br({side:2,transparent:!0,depthWrite:!1}),a=new Yr,o=Ev(),s=Ev(),c=[],l=null,u=null,d=new K,f=new K,p=new lt,m=new lt,h=new W,g=new W,_=new W(0,0,1),v=new W,y={x:0,y:0,vx:0,vy:0,active:!0};return id(()=>{let e=fS.value,d=gS.value,f=Z.value;for(let e of c.splice(0))e.dispose();t.clear(),l=u=null;for(let o of e)if(o.kind===`boost`){let{strip:e,arrows:i}=vS(o,f.radius);t.add(new Mr(e,n),new Mr(i,r)),c.push(e,i)}else{let{murk:e,edges:n}=yS(o,f.radius),r=new Mr(e,i);r.renderOrder=2,t.add(r,new si(n,a)),c.push(e,n)}let p=d.filter(e=>e.kind===`slab`),m=d.filter(e=>e.kind===`rock`);if(p.length){let e=new bi(2,2,2);l={mesh:new Wr(e,o,p.length),list:p},l.mesh.frustumCulled=!1,t.add(l.mesh),c.push(e,l.mesh)}if(m.length){let e=new wi(1,0);u={mesh:new Wr(e,s,m.length),list:m},u.mesh.frustumCulled=!1,t.add(u.mesh),c.push(e,u.mesh)}}),{group:t,update(e){if(t.visible=Zy.value===`race`&&t.children.length>0,!t.visible)return;let c=Z.value,b=.75+.25*Math.sin(e*6);r.color.set(aS.value).multiplyScalar(oS.value*b),n.color.set(aS.value),i.color.set(sS.value),i.opacity=cS.value,a.color.set(sS.value).offsetHSL(0,0,.25),o.color.set(lS.value),s.color.set(uS.value);for(let t of[l,u])t&&(t.list.forEach((n,r)=>{Ep(n,e,y);let i=pp(c,n.s);v.crossVectors(c.right[i],c.up[i]),v.dot(c.tan[i])<0&&v.negate(),f.makeBasis(c.right[i],c.up[i],v),p.setFromRotationMatrix(f),mp(c,n.s,y.x,y.y,h),n.kind===`slab`?(p.multiply(m.setFromAxisAngle(_,n.a)),g.set(n.hw,n.ht,n.hl)):(p.multiply(m.setFromAxisAngle(_,n.s)),g.setScalar(y.active?n.r:0)),t.mesh.setMatrixAt(r,d.compose(h,p,g))}),t.mesh.instanceMatrix.needsUpdate=!0)}}}var xS=[`speed`,`timer`,`minimap`,`arrow`,`standings`],SS=[`hud`],CS={speed:{x:.5,y:.9,scale:1,visible:!0,desc:`speed, boost, assist and camera`},timer:{x:.5,y:.07,scale:1,visible:!0,desc:`lap timer and splits`},minimap:{x:.9,y:.82,scale:1,visible:!0,desc:`top-down track map`},arrow:{x:.5,y:.2,scale:1,visible:!0,desc:`points at the next checkpoint (the next gate in proving)`},standings:{x:.08,y:.32,scale:1,visible:!0,desc:`your place and the gaps to the ghost rivals`}},wS=X.bool(`hud.edit`,!1,{tags:SS,desc:`drag HUD widgets to move, scroll to resize (H)`}),TS=X.str(`input.key.hudEdit`,`KeyH`,{tags:[`input`,`keys`],desc:`KeyboardEvent.code, comma-separated`}),ES=Object.fromEntries(xS.map(e=>{let t=CS[e],n=[`hud`,e];return[e,{x:X.num(`hud.${e}.x`,t.x,{min:0,max:1,hardMin:0,hardMax:1,tags:n,desc:`centre, fraction of screen width`}),y:X.num(`hud.${e}.y`,t.y,{min:0,max:1,hardMin:0,hardMax:1,tags:n,desc:`centre, fraction of screen height`}),scale:X.num(`hud.${e}.scale`,t.scale,{min:.5,max:3,hardMin:.2,hardMax:6,tags:n}),visible:X.bool(`hud.${e}.visible`,t.visible,{tags:n,desc:t.desc})}]})),DS=e=>Math.min(1,Math.max(0,e));function OS(e){let t=document.createElement(`canvas`);t.id=`minimap`,t.width=t.height=160,document.body.appendChild(t);let n=t.getContext(`2d`),r=document.createElement(`div`);r.id=`cp-arrow`,r.innerHTML=`<i></i><span></span>`,document.body.appendChild(r);let i=r.querySelector(`i`),a=r.querySelector(`span`),o={speed:e.speed,timer:e.timer,minimap:t,arrow:r,standings:e.standings};for(let e of xS){let t=o[e];t.classList.add(`hud-widget`),t.dataset.widget=e;let n=document.createElement(`button`);n.className=`hud-close`,n.textContent=`×`,n.title=`hide this widget`,n.addEventListener(`click`,()=>ES[e].visible.set(!1)),t.appendChild(n)}id(()=>{for(let e of xS){let t=ES[e],n=o[e];n.style.left=`${t.x.value*100}%`,n.style.top=`${t.y.value*100}%`,n.style.bottom=`auto`,n.style.transform=`translate(-50%, -50%) scale(${t.scale.value})`,n.classList.toggle(`hud-hidden`,!t.visible.value)}});let s=document.createElement(`div`);s.id=`hud-editor`,document.body.appendChild(s),id(()=>{let e=wS.value;if(document.body.classList.toggle(`hud-editing`,e),s.hidden=!e,!e)return;let t=xS.filter(e=>!ES[e].visible.value);s.innerHTML=`<b>HUD editor</b> drag to move · scroll to resize · × hides`+t.map(e=>` <button data-show="${e}">show ${e}</button>`).join(``)+` <button data-done>done (H)</button>`}),s.addEventListener(`click`,e=>{let t=e.target.closest(`button`);t&&(t.dataset.show&&ES[t.dataset.show].visible.set(!0),`done`in t.dataset&&wS.set(!1))});let c=null;addEventListener(`pointerdown`,e=>{if(!wS.value)return;let t=e.target.closest(`.hud-widget`);if(!t||e.target.classList.contains(`hud-close`))return;let n=t.dataset.widget,r=ES[n];c={name:n,dx:e.clientX/innerWidth-r.x.value,dy:e.clientY/innerHeight-r.y.value,before:[r.x.value,r.y.value]},e.preventDefault(),e.stopPropagation()},!0),addEventListener(`pointermove`,e=>{if(!c)return;let t=DS(e.clientX/innerWidth-c.dx),n=DS(e.clientY/innerHeight-c.dy);X.change([{layer:`user`,path:`hud.${c.name}.x`,before:X.layerValue(`user`,`hud.${c.name}.x`),after:Math.round(t*1e3)/1e3},{layer:`user`,path:`hud.${c.name}.y`,before:X.layerValue(`user`,`hud.${c.name}.y`),after:Math.round(n*1e3)/1e3}],!1)}),addEventListener(`pointerup`,()=>{if(!c)return;let{name:e,before:t}=c;c=null;let n=[`x`,`y`].map((n,r)=>({layer:`user`,path:`hud.${e}.${n}`,before:t[r],after:X.layerValue(`user`,`hud.${e}.${n}`)}));X.history.push(n.filter(e=>e.before!==e.after))}),addEventListener(`wheel`,e=>{if(!wS.value)return;let t=e.target.closest(`.hud-widget`);if(!t)return;e.preventDefault();let n=X.get(`hud.${t.dataset.widget}.scale`);n&&n.set(Math.round(Math.min(3,Math.max(.5,n.value*(e.deltaY<0?1.1:1/1.1)))*100)/100)},{passive:!1,capture:!0});let l=null,u={cx:0,cz:0,k:1},d=new W,f=new W;return{update(e){let o=ES.minimap.visible.value&&!!e.track;if(t.hidden=!o&&!wS.value,n&&e.track&&o){let t=e.track;if(l!==t){let e=1/0,n=-1/0,r=1/0,i=-1/0;for(let a of[...t.pos,...(t.branches??[]).flatMap(e=>e.pos)])e=Math.min(e,a.x),n=Math.max(n,a.x),r=Math.min(r,a.z),i=Math.max(i,a.z);u={cx:(e+n)/2,cz:(r+i)/2,k:140/Math.max(n-e,i-r,1)},l=t}let r=e=>80+(e-u.cx)*u.k,i=e=>80+(e-u.cz)*u.k;n.clearRect(0,0,160,160),n.fillStyle=`rgba(255,255,255,0.75)`,n.beginPath(),n.arc(80,80,80,0,Math.PI*2),n.fill(),n.strokeStyle=`#5a3fa0`,n.lineWidth=3,n.beginPath();for(let e=0;e<t.pos.length;e+=4){let a=t.pos[e];e===0?n.moveTo(r(a.x),i(a.z)):n.lineTo(r(a.x),i(a.z))}if(n.closePath(),n.stroke(),n.lineWidth=2,(t.branches??[]).forEach((t,a)=>{let o=e.branchColors?.[a];if(!o)return;n.strokeStyle=o,n.beginPath();for(let e=0;e<t.pos.length;e+=4){let a=t.pos[e];e===0?n.moveTo(r(a.x),i(a.z)):n.lineTo(r(a.x),i(a.z))}let s=t.pos[t.pos.length-1];n.lineTo(r(s.x),i(s.z)),n.stroke()}),e.nextCp!==null){let a=t.pos[Math.min(t.pos.length-1,Math.floor(e.nextCp/t.length*t.pos.length))];n.fillStyle=`#0aa5c8`,n.beginPath(),n.arc(r(a.x),i(a.z),4,0,Math.PI*2),n.fill()}f.set(0,0,-1).applyQuaternion(e.shipQuat);let a=Math.atan2(f.z,f.x),o=r(e.shipPos.x),s=i(e.shipPos.z);n.fillStyle=`#ff2fa8`,n.beginPath(),n.moveTo(o+Math.cos(a)*7,s+Math.sin(a)*7),n.lineTo(o+Math.cos(a+2.5)*5,s+Math.sin(a+2.5)*5),n.lineTo(o+Math.cos(a-2.5)*5,s+Math.sin(a-2.5)*5),n.fill()}let s=ES.arrow.visible.value&&!!e.track&&(e.nextCp!==null||!!e.target);if(r.hidden=!s&&!wS.value,s&&e.track){let t=e.track,n=e.target??t.pos[Math.min(t.pos.length-1,Math.floor(e.nextCp/t.length*t.pos.length))];d.copy(n).applyMatrix4(e.camera.matrixWorldInverse),i.style.transform=`rotate(${Math.atan2(d.x,d.y)*180/Math.PI}deg)`,r.classList.toggle(`behind`,d.z>0),a.textContent=`${Math.round(n.distanceTo(e.shipPos))} m`}}}}var kS=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},AS=new Wo(-1,1,1,-1,0,1),jS=new class extends cr{constructor(){super(),this.setAttribute(`position`,new Xn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new Xn([0,2,0,0,2,0],2))}},MS=class{constructor(e){this._mesh=new Mr(jS,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,AS)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},NS={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},PS={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new q(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},FS=class e extends kS{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new U(256,256):new U(e.x,e.y),this.clearColor=new q(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new kt(i,a,{type:_,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new kt(i,a,{type:_,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new kt(i,a,{type:_,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=PS;this.highPassUniforms=no.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ao({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new U(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=no.clone(NS.uniforms),this.blendMaterial=new ao({uniforms:this.copyUniforms,vertexShader:NS.vertexShader,fragmentShader:NS.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new q,this._oldClearAlpha=1,this._basic=new br,this._fsQuad=new MS(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new U(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new ao({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new U(.5,.5)},direction:{value:new U(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new ao({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};FS.BlurDirectionX=new U(1,0),FS.BlurDirectionY=new U(0,1);var IS={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},LS=class extends kS{constructor(){super(),this.isOutputPass=!0,this.uniforms=no.clone(IS.uniforms),this.material=new oo({name:IS.name,uniforms:this.uniforms,vertexShader:IS.vertexShader,fragmentShader:IS.fragmentShader}),this._fsQuad=new MS(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},gt.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},RS=[`final`,`color`,`edges`,`normals`,`depth`],zS=X.enum(`render.debug.view`,`final`,RS,{tags:[`render`,`debug`],desc:`final | color (no outline) | edges | normals | depth`}),BS=[`render`,`outline`],VS=X.bool(`render.outline.enabled`,!0,{tags:BS}),HS=X.color(`render.outline.color`,`#000000`,{tags:BS}),US=X.num(`render.outline.thickness`,1.5,{min:.5,max:5,hardMin:0,hardMax:20,unit:`px`,tags:BS}),WS=X.num(`render.outline.depth`,.15,{min:.005,max:1,hardMin:0,tags:BS,desc:`relative depth jump that draws a line (silhouettes)`}),GS=X.num(`render.outline.creaseFade`,250,{min:10,max:2e3,hardMin:1,unit:`m`,tags:BS,desc:`crease lines fade out by this distance so far objects don’t turn into ink blots`}),KS=X.num(`render.outline.normal`,.25,{min:.02,max:1.5,hardMin:0,tags:BS,desc:`normal change that draws a line (creases)`}),qS=[`render`,`bloom`],JS=X.bool(`render.bloom.enabled`,!0,{tags:qS}),YS=X.num(`render.bloom.strength`,.8,{min:0,max:3,hardMin:0,tags:qS}),XS=X.num(`render.bloom.radius`,.4,{min:0,max:1,hardMin:0,hardMax:1,tags:qS}),ZS=X.num(`render.bloom.threshold`,1.1,{min:0,max:3,hardMin:0,tags:qS,desc:`only pixels brighter than this glow; lit toon surfaces stay under ~1, emissives go over`}),QS={uniforms:{tColor:{value:null},tDepth:{value:null},tNormal:{value:null},texel:{value:new U},thickness:{value:1},depthThreshold:{value:.1},normalThreshold:{value:.5},creaseFade:{value:250},outlineColor:{value:new q},outlineOn:{value:1},cameraNear:{value:.1},cameraFar:{value:1e3},view:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,fragmentShader:`
    #include <packing>
    uniform sampler2D tColor;
    uniform sampler2D tDepth;
    uniform sampler2D tNormal;
    uniform vec2 texel;
    uniform float thickness;
    uniform float depthThreshold;
    uniform float normalThreshold;
    uniform float creaseFade;
    uniform vec3 outlineColor;
    uniform float outlineOn;
    uniform float cameraNear;
    uniform float cameraFar;
    uniform int view;
    varying vec2 vUv;

    float viewDepth(vec2 uv) {
      return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, cameraNear, cameraFar);
    }

    void main() {
      vec2 o = texel * thickness;
      // Sobel over a 3x3 neighbourhood
      float d[9];
      vec3 n[9];
      int k = 0;
      for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
          vec2 uv = vUv + vec2(float(x), float(y)) * o;
          d[k] = viewDepth(uv);
          n[k] = texture2D(tNormal, uv).rgb;
          k++;
        }
      }
      // silhouettes: one-sided, drawn only on the far side of a depth jump, so lines sit
      // outside an object and small/distant objects keep their fill
      float nearest = d[4];
      for (int i = 0; i < 9; i++) nearest = min(nearest, d[i]);
      float depthEdge = (d[4] - nearest) / max(d[4], 1e-3);
      // creases: largest normal change to a direct neighbour. Unlike Sobel this ignores smooth
      // curvature (tubes, spheres) and only fires on real corners; faded with distance.
      float dn = 0.0;
      dn = max(dn, length(n[1] - n[4]));
      dn = max(dn, length(n[3] - n[4]));
      dn = max(dn, length(n[5] - n[4]));
      dn = max(dn, length(n[7] - n[4]));
      float normalEdge = dn * (1.0 - smoothstep(creaseFade * 0.5, creaseFade, d[4]));
      float edge = max(step(depthThreshold, depthEdge), step(normalThreshold, normalEdge)) * outlineOn;

      vec4 color = texture2D(tColor, vUv);
      if (view == 1) gl_FragColor = color;
      else if (view == 2) gl_FragColor = vec4(vec3(1.0 - edge), 1.0);
      else if (view == 3) gl_FragColor = vec4(texture2D(tNormal, vUv).rgb, 1.0);
      else if (view == 4) gl_FragColor = vec4(vec3(1.0 - clamp(log2(d[4]) / log2(cameraFar), 0.0, 1.0)), 1.0);
      else gl_FragColor = vec4(mix(color.rgb, outlineColor, edge), 1.0);
    }`},$S={uniforms:{tColor:{value:null},aberration:{value:0},vignette:{value:0}},vertexShader:QS.vertexShader,fragmentShader:`
    uniform sampler2D tColor;
    uniform float aberration;
    uniform float vignette;
    varying vec2 vUv;
    void main() {
      vec2 d = vUv - 0.5;
      vec2 off = d * aberration;
      vec4 c = texture2D(tColor, vUv);
      c.r = texture2D(tColor, vUv + off).r;
      c.b = texture2D(tColor, vUv - off).b;
      float v = 1.0 - vignette * smoothstep(0.25, 0.75, length(d) * 1.2);
      gl_FragColor = vec4(c.rgb * v, 1.0);
    }`},eC={aberration:0,vignette:0};function tC(e){let t={type:_,samples:4},n=new kt(1,1,{...t,depthTexture:new _i(1,1)}),r=new kt(1,1,t),i=new kt(1,1,{type:_}),a=new kt(1,1,{type:_}),o=new ao($S),s=new MS(o),c=new co,l=new ao(QS),u=new MS(l),d=new FS(new U(1,1),1,.4,1),f=new LS;f.renderToScreen=!0;let p=new q(0,0,0),m=new q;return{setSize(t,o){let s=e.getPixelRatio(),c=Math.floor(t*s),u=Math.floor(o*s);n.setSize(c,u),r.setSize(c,u),i.setSize(c,u),a.setSize(c,u),d.setSize(c,u),l.uniforms.texel.value.set(1/c,1/u)},render(t,h,g){let _=l.uniforms,v=RS.indexOf(zS.value);h.layers.enable(1),e.setRenderTarget(n),e.render(t,h);let y=VS.value&&v!==1||v===3;if(y){h.layers.disable(1);let n=t.background;t.background=null,t.overrideMaterial=c,e.getClearColor(m);let i=e.getClearAlpha();e.setClearColor(p,1),e.setRenderTarget(r),e.clear(),e.render(t,h),e.setClearColor(m,i),t.overrideMaterial=null,t.background=n,h.layers.enable(1)}_.tColor.value=n.texture,_.tDepth.value=n.depthTexture,_.tNormal.value=r.texture,_.thickness.value=US.value,_.depthThreshold.value=WS.value,_.normalThreshold.value=KS.value,_.creaseFade.value=GS.value,_.outlineColor.value.set(HS.value),_.outlineOn.value=VS.value&&y?1:0,_.cameraNear.value=h.near,_.cameraFar.value=h.far,_.view.value=v,e.setRenderTarget(i),u.render(e),JS.value&&v<=1&&(d.strength=YS.value,d.radius=XS.value,d.threshold=ZS.value,d.render(e,i,i,0,!1));let b=i;if(v===0&&(eC.aberration>0||eC.vignette>0)&&(o.uniforms.tColor.value=i.texture,o.uniforms.aberration.value=eC.aberration,o.uniforms.vignette.value=eC.vignette,e.setRenderTarget(a),s.render(e),b=a),g){let t=e.domElement.clientHeight;e.setViewport(g.x,t-g.y-g.h,g.w,g.h),e.setScissor(g.x,t-g.y-g.h,g.w,g.h),e.setScissorTest(!0)}f.render(e,null,b,0,!1),g&&(e.setScissorTest(!1),e.setViewport(0,0,e.domElement.clientWidth,e.domElement.clientHeight))}}}var nC=[`single`,`pip`,`side`,`quad`],rC=[`cam`,`view`],iC=X.enum(`view.layout`,`single`,nC,{tags:rC,desc:`single, picture-in-picture, side by side, or 2×2`}),aC=[X.enum(`view.vp2.rig`,`lookback`,z_,{tags:rC,desc:`second viewport (pip, side, quad)`}),X.enum(`view.vp3.rig`,`top`,z_,{tags:rC,desc:`third viewport (quad)`}),X.enum(`view.vp4.rig`,`orbit`,z_,{tags:rC,desc:`fourth viewport (quad)`})],oC=X.num(`view.pip.size`,.3,{min:.1,max:.6,hardMin:.05,hardMax:1,tags:rC,desc:`picture-in-picture width, fraction of the screen`});function sC(e,t,n,r=.3){let i={x:0,y:0,w:t,h:n};switch(e){case`pip`:{let e=Math.round(t*r),n=Math.round(e*9/16);return{main:i,extra:[{x:t-e-12,y:52,w:e,h:n}]}}case`side`:{let e=Math.floor(t/2);return{main:{x:0,y:0,w:e,h:n},extra:[{x:e,y:0,w:t-e,h:n}]}}case`quad`:{let e=Math.floor(t/2),r=Math.floor(n/2);return{main:{x:0,y:0,w:e,h:r},extra:[{x:e,y:0,w:t-e,h:r},{x:0,y:r,w:e,h:n-r},{x:e,y:r,w:t-e,h:n-r}]}}default:return{main:i,extra:[]}}}function cC(e,t,n){let r=aC.map(()=>{let e=new Uo(70,1,.1,12e3);return e.layers.enable(1),e}),i=aC.map(()=>tv()),a=aC.map(()=>null),o=document.createElement(`div`);o.id=`viewports`,document.body.appendChild(o);let s=aC.map((e,t)=>{let n=document.createElement(`div`);n.className=`vp`,n.innerHTML=`<div class="bar"><select title="camera rig">${z_.map(e=>`<option>${e}</option>`).join(``)}</select><button title="open in its own window">pop out</button></div>`;let r=n.querySelector(`select`);return r.addEventListener(`change`,()=>{e.set(r.value),r.blur()}),n.querySelector(`button`).addEventListener(`click`,e=>{e.currentTarget.blur(),c(t)}),o.appendChild(n),{f:n,sel:r}});function c(e){if(a[e]){a[e].win.focus();return}let t=window.open(``,`kocmoc-vp${e+2}`,`width=800,height=450`);if(!t)return;t.document.title=`kocmoc · ${aC[e].value}`,t.document.body.style.cssText=`margin:0;background:#fff;overflow:hidden`;let n=t.document.createElement(`canvas`);n.style.cssText=`display:block;width:100vw;height:100vh`,t.document.body.appendChild(n);let r=new Mu({canvas:n,antialias:!0});a[e]={win:t,renderer:r},t.addEventListener(`pagehide`,()=>{r.dispose(),a[e]=null})}let l=(e,t,n,a)=>{let o=r[e];return o.aspect!==a&&(o.aspect=a,o.updateProjectionMatrix()),uv(aC[e].value,o,t,n,i[e]),o};return{mainRect(){return sC(iC.value,innerWidth,innerHeight,oC.value).main},render(r,i){let{extra:o}=sC(iC.value,innerWidth,innerHeight,oC.value),c=e.domElement.clientHeight;s.forEach(({f:e,sel:t},n)=>{let r=o[n];e.hidden=!r,r&&(e.style.cssText=`left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px`,e.classList.toggle(`popped`,!!a[n]),t.value!==aC[n].value&&(t.value=aC[n].value))}),e.setRenderTarget(null),o.forEach((o,s)=>{if(a[s])return;let u=l(s,r,i,o.w/o.h);n.update(u,e.getPixelRatio()),e.setViewport(o.x,c-o.y-o.h,o.w,o.h),e.setScissor(o.x,c-o.y-o.h,o.w,o.h),e.setScissorTest(!0),e.render(t,u)}),e.setScissorTest(!1),e.setViewport(0,0,e.domElement.clientWidth,c),a.forEach((e,o)=>{if(!e)return;if(e.win.closed){e.renderer.dispose(),a[o]=null;return}let s=e.win.innerWidth,c=e.win.innerHeight,u=e.renderer.getSize(new U);(u.x!==s||u.y!==c)&&e.renderer.setSize(s,c,!1);let d=l(o,r,i,s/Math.max(c,1));n.update(d,e.renderer.getPixelRatio()),e.renderer.render(t,d)})}}}var lC=[`slalom`,`spiral`,`pairs`,`reverse`],uC=(e,t,n)=>e+(t-e)*n,dC=Math.PI*2;function fC(e,t){let n=Fd((t.seed^1374496523)>>>0),r=e.radius,i=Math.max(60,t.groupLength),a=Math.max(0,t.lead),o=e.length-Math.max(60,i*.4),s=Math.max(0,Math.floor((o-a)/i)),c=t.patterns.length?t.patterns:[`slalom`],l=Math.max(1,Math.round(t.gates)),u=Math.max(t.shipRadius*1.6,.5),d=[],f=[],p=e=>e[Math.floor(n()*e.length)%e.length],m;for(let e=0;e<s;e++){let o=a+e*i,h=uC(t.rampStart,t.rampEnd,s>1?e/(s-1):0),g=p(c.length>1?c.filter(e=>e!==m):c);m=g;let _=Math.min(r*.6,Math.max(u,uC(t.gateRadius,t.gateRadiusMin,h))),v=Math.max(0,r-_-1)*Math.min(1,Math.max(0,uC(t.offsetMin,t.offsetMax,h))),y=i*.8,b=e=>o+y*(e+.5)/l,x=n()*dC,S=(n()<.5?-1:1)*Math.PI*uC(.3,.55,h),C=[];for(let e=0;e<l;e++)g===`slalom`?C.push(x+e%2*Math.PI):g===`spiral`?C.push(x+e*S):g===`pairs`?C.push(x+Math.floor(e/2)*Math.PI):C.push(x);for(let t=0;t<l;t++){let n=g===`reverse`&&t===l-1,i=n?Math.min(r*.6,_*1.4):_,a=n?0:v;d.push({s:b(t),x:a*Math.cos(C[t]),y:a*Math.sin(C[t]),r:i,reverse:n,pattern:g,group:e})}let w=Math.max(0,Math.round(t.beacons)),T=Math.max(.5,t.beaconRadius);for(let e=0;e<w;e++){let t=Math.min(l-1,Math.floor((e+.5)*l/w)),i=t<l-1?(b(t)+b(t+1))/2:b(t)+y/l/2,a=C[t]+Math.PI+(n()-.5)*.8,o=Math.max(0,r-T-2)*uC(.7,.95,h);f.push({s:i,x:o*Math.cos(a),y:o*Math.sin(a),r:T})}}return d.sort((e,t)=>e.s-t.s),f.sort((e,t)=>e.s-t.s),{gates:d,beacons:f}}var pC=[`gen`,`proving`],mC={lead:X.num(`gen.proving.lead`,250,{min:0,max:1e3,hardMin:0,unit:`m`,tags:pC,regen:!0,desc:`clear run-up after the start line`}),groupLength:X.num(`gen.proving.groupLength`,320,{min:100,max:1e3,hardMin:60,unit:`m`,tags:pC,regen:!0,desc:`track length per gate group`}),gates:X.int(`gen.proving.gates`,4,{min:1,max:8,hardMin:1,hardMax:32,tags:pC,regen:!0,desc:`gates per group`}),gateRadius:X.num(`gen.proving.gateRadius`,10,{min:3,max:25,hardMin:1,unit:`m`,tags:pC,regen:!0,desc:`gate opening at the easy end of the ramp`}),gateRadiusMin:X.num(`gen.proving.gateRadiusMin`,5,{min:2.5,max:25,hardMin:1,unit:`m`,tags:pC,regen:!0,desc:`gate opening at the hard end (never below 1.6 ship radii)`}),offsetMin:X.num(`gen.proving.offsetMin`,.2,{min:0,max:1,hardMin:0,hardMax:1,tags:pC,regen:!0,desc:`how far gates sit off the centre at the easy end, share of the room`}),offsetMax:X.num(`gen.proving.offsetMax`,.7,{min:0,max:1,hardMin:0,hardMax:1,tags:pC,regen:!0,desc:`how far gates sit off the centre at the hard end`}),rampStart:X.num(`gen.proving.rampStart`,0,{min:0,max:1,hardMin:0,hardMax:1,tags:pC,regen:!0,desc:`difficulty of the first group`}),rampEnd:X.num(`gen.proving.rampEnd`,.6,{min:0,max:1,hardMin:0,hardMax:1,tags:pC,regen:!0,desc:`difficulty of the last group`}),beacons:X.int(`gen.proving.beacons`,1,{min:0,max:4,hardMin:0,hardMax:16,tags:pC,regen:!0,desc:`time beacons per group, off the racing line`}),beaconRadius:X.num(`gen.proving.beaconRadius`,3,{min:.5,max:10,hardMin:.2,unit:`m`,tags:pC,regen:!0,desc:`pickup radius of a beacon`})},hC=lC.map(e=>[e,X.bool(`gen.proving.patterns.${e}`,e!==`reverse`,{tags:pC,regen:!0,desc:e===`reverse`?`last gate of the group flown backwards`:void 0})]),gC=[`proving`],_C={budget:X.num(`proving.budget`,120,{min:10,max:600,hardMin:1,unit:`s`,tags:gC,desc:`time on the clock at the start line`}),gateBonus:X.num(`proving.gateBonus`,1,{min:0,max:20,hardMin:0,unit:`s`,tags:gC,desc:`added for each gate flown through`}),missPenalty:X.num(`proving.missPenalty`,10,{min:0,max:30,hardMin:0,unit:`s`,tags:gC,desc:`taken for passing a gate outside it`}),beaconBonus:X.num(`proving.beaconBonus`,5,{min:0,max:30,hardMin:0,unit:`s`,tags:gC,desc:`added for each time beacon`}),oobPenalty:X.num(`proving.oobPenalty`,5,{min:0,max:30,hardMin:0,unit:`s`,tags:gC,desc:`taken when out of bounds puts you back (open space)`}),reverseWindow:X.num(`proving.reverseWindow`,120,{min:20,max:500,hardMin:1,unit:`m`,tags:gC,desc:`a reverse gate is missed once you are this far past it`}),scoreTime:X.num(`proving.score.time`,10,{min:0,max:100,hardMin:0,tags:gC,desc:`points per second left`}),scoreGate:X.num(`proving.score.gate`,50,{min:0,max:500,hardMin:0,tags:gC,desc:`points per gate`}),scoreBeacon:X.num(`proving.score.beacon`,25,{min:0,max:500,hardMin:0,tags:gC,desc:`points per beacon`})},vC=X.int(`proving.level`,1,{min:1,max:20,hardMin:1,hardMax:999,tags:gC,desc:`ladder level; 1–8 are bundled, beyond that they are generated`}),yC=[`render`,`proving`],bC=X.color(`render.proving.gate`,`#40e0ff`,{tags:yC}),xC=X.color(`render.proving.reverse`,`#ffb02e`,{tags:yC,desc:`gates to fly through backwards`}),SC=X.color(`render.proving.hit`,`#5dff9a`,{tags:yC}),CC=X.color(`render.proving.miss`,`#ff4060`,{tags:yC}),wC=X.color(`render.proving.beacon`,`#ffe14d`,{tags:yC}),TC=X.num(`render.proving.glow`,1.6,{min:0,max:6,hardMin:0,tags:yC,desc:`above the bloom threshold gates glow`}),EC=$u(()=>({seed:Sb.value,lead:mC.lead.value,groupLength:mC.groupLength.value,gates:mC.gates.value,gateRadius:mC.gateRadius.value,gateRadiusMin:mC.gateRadiusMin.value,offsetMin:mC.offsetMin.value,offsetMax:mC.offsetMax.value,rampStart:mC.rampStart.value,rampEnd:mC.rampEnd.value,beacons:mC.beacons.value,beaconRadius:mC.beaconRadius.value,shipRadius:Px.value,patterns:hC.filter(([,e])=>e.value).map(([e])=>e)})),DC=()=>({budget:_C.budget.value,gateBonus:_C.gateBonus.value,missPenalty:_C.missPenalty.value,beaconBonus:_C.beaconBonus.value,oobPenalty:_C.oobPenalty.value,reverseWindow:_C.reverseWindow.value,scoreTime:_C.scoreTime.value,scoreGate:_C.scoreGate.value,scoreBeacon:_C.scoreBeacon.value}),OC=$u(()=>Zy.value===`proving`?fC(Z.value,EC.value):null),kC=.45,AC=new K,jC=new W,MC=new lt,NC=new W,PC=new q;function FC(e){let t=new on;e.add(t);let n=new br,r=new br,i=[],a=[],o=null,s=null,c=``;return id(()=>{s=OC.value;let e=Z.value;for(let e of i.splice(0))e.dispose();if(t.clear(),a=[],o=null,c=``,!s)return;let l=new Map;s.gates.forEach((e,t)=>{let n=Math.round(e.r*100)/100;l.set(n,[...l.get(n)??[],t])});for(let[r,o]of l){let c=new Ja(r,kC,8,40),l=new Wr(c,n,o.length);o.forEach((t,n)=>{let r=s.gates[t],i=pp(e,r.s);AC.makeBasis(e.right[i],e.up[i],e.tan[i]).setPosition(mp(e,r.s,r.x,r.y,jC)),l.setMatrixAt(n,AC),l.setColorAt(n,PC.set(`#ffffff`))}),l.instanceMatrix.needsUpdate=!0,t.add(l),i.push(c,l),a.push({mesh:l,ids:o})}if(s.beacons.length){let e=new Ua(1,0);o=new Wr(e,r,s.beacons.length),t.add(o),i.push(e,o)}}),{group:t,update(e,i){if(t.visible=!!s,!s)return;let l=TC.value;n.color.setScalar(l),r.color.set(wC.value).multiplyScalar(l);let u=(i?Array.from(i.gates).join(``):``)+bC.value+xC.value+SC.value+CC.value;if(u!==c){c=u;for(let{mesh:e,ids:t}of a)t.forEach((t,n)=>{let r=i?.gates[t]??0;PC.set(r>0?SC.value:r<0?CC.value:s.gates[t].reverse?xC.value:bC.value),e.setColorAt(n,PC)}),e.instanceColor&&(e.instanceColor.needsUpdate=!0)}if(o){let t=Z.value;s.beacons.forEach((n,r)=>{let a=!!i?.beacons[r];mp(t,n.s,n.x,n.y,jC),MC.setFromAxisAngle(an.DEFAULT_UP,e*2+r);let s=a?0:n.r*.6;AC.compose(jC,MC,NC.set(s,s*1.4,s)),o.setMatrixAt(r,AC)}),o.instanceMatrix.needsUpdate=!0}}}}function IC(e,t,n){let r=t.gates.findIndex(e=>e===0);if(r<0)return null;let i=e.gates[r];return mp(Z.value,i.s,i.x,i.y,n)}var LC=[`light`,`balanced`,`heavy`],RC=e=>`proving-${e}`;function zC(e,t){let n=Math.max(1,Math.round(e)),r=t.find(e=>e.name===RC(n));if(r)return r;let i=t.find(e=>e.name===RC(8));if(!i||n<=8)return;let a=n-8,o={...i.vars},s=(e,t)=>typeof o[e]==`number`?o[e]:t;return o[`proving.level`]=n,o[`proving.budget`]=Math.max(20,Math.round(s(`proving.budget`,90)*.95**a)),o[`gen.proving.gateRadiusMin`]=Math.max(2.5,Math.round((s(`gen.proving.gateRadiusMin`,4)-.2*a)*10)/10),o[`gen.proving.gateRadius`]=Math.max(o[`gen.proving.gateRadiusMin`],Math.round((s(`gen.proving.gateRadius`,7)-.2*a)*10)/10),o[`gen.proving.offsetMax`]=Math.min(.95,Math.round((s(`gen.proving.offsetMax`,.8)+.01*a)*100)/100),{...i,name:RC(n),desc:`Proving ground level ${n} (generated)`,seed:(i.seed??0)+101*a,vars:o}}function BC(e){let t={};if(!e||typeof e!=`object`||Array.isArray(e))return t;for(let[n,r]of Object.entries(e)){if(!r||typeof r!=`object`)continue;let e=r,i=typeof e.cleared==`number`&&Number.isFinite(e.cleared)?Math.max(0,Math.round(e.cleared)):0,a={};if(e.best&&typeof e.best==`object`)for(let[t,n]of Object.entries(e.best))typeof n==`number`&&Number.isFinite(n)&&(a[t]=n);t[n]={cleared:i,best:a}}return t}function VC(e,t,n,r,i){let a=e[t]??{cleared:0,best:{}};if(!i)return{ladder:e,newBest:!1,badge:!1};let o=a.best[n],s=o===void 0||r>o,c=Math.max(a.cleared,n),l=a.cleared<8&&c>=8,u={cleared:c,best:s?{...a.best,[n]:r}:a.best};return{ladder:{...e,[t]:u},newBest:s,badge:l}}var HC=(e,t)=>(e[t]?.cleared??0)>=8;function UC(e,t){return(e[t]?.cleared??0)+1}var WC=e=>e.replace(/[&<>"]/g,e=>`&#${e.charCodeAt(0)};`);function GC(e){let t=document.createElement(`div`);t.id=`levels`,t.hidden=!0,document.body.appendChild(t);let n=`balanced`;function r(){let r=e.ladder(),i=r[n],a=UC(r,n),o=Math.max(8,a),s=LC.map(e=>`<button class="ship${e===n?` on`:``}" data-ship="${e}" title="${HC(r,e)?`badge earned`:`clear level 8 for the badge`}">${HC(r,e)?`★ `:``}${e}</button>`).join(``),c=Array.from({length:o},(e,t)=>{let n=t+1,r=i?.best[n],o=n>a;return`<button class="level${(i?.cleared??0)>=n?` done`:``}" data-level="${n}"${o?` disabled`:``}>
        <b>${n}</b><span>${o?`locked`:r===void 0?n>8?`bonus`:`–`:WC(String(r))}</span></button>`}).join(``);t.innerHTML=`
      <div class="lv-panel" role="dialog" aria-label="Proving ground">
        <header><h2>Proving ground</h2><button class="lv-close" title="close (Esc)">×</button></header>
        <p class="lv-help">Fly the gates against the clock. Gates and beacons add time, misses cost it. Clear level 8 with a ship for its badge.</p>
        <div class="lv-ships">${s}</div>
        <div class="lv-grid">${c}</div>
        ${e.ship()===null?`<p class="lv-note">Your ship is custom-tuned: pick a preset to earn badges.</p>`:``}
      </div>`}t.addEventListener(`click`,a=>{let o=a.target;if(o===t||o.closest(`.lv-close`))return i(!1);let s=o.closest(`[data-ship]`)?.dataset.ship;if(s){n=s,r();return}let c=o.closest(`[data-level]`);c&&!c.disabled&&(i(!1),e.play(Number(c.dataset.level),n))}),addEventListener(`keydown`,e=>{!t.hidden&&e.code===`Escape`&&i(!1)});function i(i=t.hidden){i&&(n=e.ship()??n,r(),document.pointerLockElement&&document.exitPointerLock()),t.hidden=!i}return{toggle:i,get open(){return!t.hidden}}}var KC=e=>e.replace(/[&<>"]/g,e=>`&#${e.charCodeAt(0)};`),qC={loop:`loop`,figure8:`figure eight`,trefoil:`trefoil knot`,star:`star knot`,coil:`coil`,upright:`upright loop`,clover:`clover`,tangle:`tangle`,stunt:`loops and corkscrews`},JC=(e,t)=>typeof e==`string`&&/^#[0-9a-f]{6}$/i.test(e)?e:t;function YC(e){let t=e.vars??{},n=[qC[String(t[`gen.race.shape`]??`loop`)]??String(t[`gen.race.shape`])],r=Number(t[`gen.race.twist`]??0);r&&n.push(`${Math.abs(r)} roll${Math.abs(r)>1?`s`:``} a lap`);let i=t[`gen.race.profile`];typeof i==`string`&&i!==`tube`&&n.push(i);let a=t[`race.laps`];return typeof a==`number`&&n.push(`${a} lap${a===1?``:`s`}`),n}function XC(e){let t=document.createElement(`div`);t.id=`tracks`,t.hidden=!0,document.body.appendChild(t);function n(){let n=e.current(),r=e.venues().map(e=>{let t=e.vars??{},r=`linear-gradient(${JC(t[`render.sky.zenith`],`#1a0b3d`)}, ${JC(t[`render.background`],`#05010f`)})`,i=JC(t[`render.track.stripe`],`#5a3fa0`);return`<button class="venue${e.name===n?` on`:``}" data-venue="${KC(e.name)}">
          <i class="sw" style="background:${r}"><b style="background:${i}"></b></i>
          <span class="tx"><b>${KC(e.title??e.name)}</b><small>${KC(YC(e).join(` · `))}</small><em>${KC(e.desc??``)}</em></span>
        </button>`}).join(``);t.innerHTML=`
      <div class="tk-panel" role="dialog" aria-label="Race tracks">
        <header><h2>Race tracks</h2><button class="tk-close" title="close (Esc)">×</button></header>
        <p class="tk-help">Fifteen worlds to race, five of them underground. Each has its own shortcuts, tunnels and hazards, and your ghosts are kept per track.</p>
        <div class="tk-list">${r}</div>
      </div>`}t.addEventListener(`click`,n=>{let i=n.target;if(i===t||i.closest(`.tk-close`))return r(!1);let a=i.closest(`[data-venue]`)?.dataset.venue,o=e.venues().find(e=>e.name===a);o&&(r(!1),e.play(o))}),addEventListener(`keydown`,e=>{!t.hidden&&e.code===`Escape`&&r(!1)});function r(e=t.hidden){e&&(n(),document.pointerLockElement&&document.exitPointerLock()),t.hidden=!e}return{toggle:r,get open(){return!t.hidden}}}var ZC=(e,t,n)=>Math.min(n,Math.max(t,e)),QC=class{value=0;add(e){this.value=ZC(this.value+e,0,1)}step(e,t){this.value=Math.max(0,this.value-t*e)}get shake(){return this.value*this.value}};function $C(e,t,n){let r=Math.PI*2*t;return .5*Math.sin(r*e+n*1.7)+.3*Math.sin(r*2.31*e+n*4.3)+.2*Math.sin(r*4.67*e+n*9.1)}function ew(e,t,n,r,i){let a=Math.PI*2*n,o=Math.max(1,Math.ceil(i/(1/240))),s=i/o;for(let n=0;n<o;n++)e.v+=(a*a*(t-e.x)-2*r*a*e.v)*s,e.x+=e.v*s}var tw=class{hold=0;slowFrom=1;slowLeft=0;slowDur=0;hitStop(e){this.hold=Math.max(this.hold,e)}slowMo(e,t){t<=0||(this.slowFrom=Math.min(this.current(),ZC(e,0,1)),this.slowDur=t,this.slowLeft=t)}current(){if(this.hold>0)return 0;if(this.slowLeft<=0)return 1;let e=1-this.slowLeft/this.slowDur;return this.slowFrom+(1-this.slowFrom)*e*e}step(e){let t=this.current();return this.hold>0?this.hold=Math.max(0,this.hold-e):this.slowLeft>0&&(this.slowLeft=this.slowLeft-e>1e-9?this.slowLeft-e:0),t}};function nw(e,t,n,r){let i=ZC((e/Math.max(t,1e-6)-r.from)/Math.max(1-r.from,1e-6),0,1.5);return r.speed*i+r.boost*ZC(n,0,1)}function rw(e,t,n){return ZC(-e*t,-n,n)}var iw=class{capacity;pos;vel;life;maxLife;next=0;constructor(e){this.capacity=e,this.pos=new Float32Array(e*3),this.vel=new Float32Array(e*3),this.life=new Float32Array(e),this.maxLife=new Float32Array(e)}emit(e,t,n,r,i,a,o){let s=this.next;this.next=(this.next+1)%this.capacity,this.pos.set([e,t,n],s*3),this.vel.set([r,i,a],s*3),this.life[s]=o,this.maxLife[s]=o}step(e,t){let n=Math.exp(-t*e);for(let t=0;t<this.capacity;t++)if(!(this.life[t]<=0)){this.life[t]=Math.max(0,this.life[t]-e);for(let r=0;r<3;r++)this.vel[t*3+r]*=n,this.pos[t*3+r]+=this.vel[t*3+r]*e}}get alive(){let e=0;for(let t=0;t<this.capacity;t++)this.life[t]>0&&e++;return e}};function aw(){let e=null,t=null,n=null,r=null,i=null,a=null,o=null,s=!1,c=()=>{if(!s||e)return;let c=window.AudioContext??window.webkitAudioContext;if(!c)return;e=new c,t=e.createGain(),t.connect(e.destination),a=e.createBiquadFilter(),a.type=`lowpass`,a.frequency.value=600,n=e.createGain(),n.gain.value=0,a.connect(n).connect(t),r=e.createOscillator(),r.type=`sawtooth`,i=e.createOscillator(),i.type=`square`,r.connect(a),i.connect(a),r.start(),i.start(),o=e.createBuffer(1,e.sampleRate,e.sampleRate);let l=o.getChannelData(0);for(let e=0;e<l.length;e++)l[e]=Math.random()*2-1};addEventListener(`keydown`,c),addEventListener(`pointerdown`,c);let l=(n,r,i,a,s)=>{if(!e||!t||!o)return;let c=e.currentTime,l=e.createBufferSource();l.buffer=o;let u=e.createBiquadFilter();u.type=s,u.Q.value=2,u.frequency.setValueAtTime(r,c),u.frequency.exponentialRampToValueAtTime(Math.max(20,i),c+n);let d=e.createGain();d.gain.setValueAtTime(a,c),d.gain.exponentialRampToValueAtTime(1e-4,c+n),l.connect(u).connect(d).connect(t),l.start(c),l.stop(c+n)};return{enable(n,r){s=n,e&&t&&(t.gain.setTargetAtTime(n?r:0,e.currentTime,.05),n&&e.state===`suspended`&&e.resume())},engine(t,o,s){if(!e||!r||!i||!n||!a)return;let c=e.currentTime,l=45*(1+t*1.6+o*.6);r.frequency.setTargetAtTime(l,c,.05),i.frequency.setTargetAtTime(l*1.503,c,.05),a.frequency.setTargetAtTime(300+1800*Math.min(t,1.5)+1200*o,c,.08),n.gain.setTargetAtTime(.12*Math.min(1,s)*(.4+.6*Math.min(t,1)),c,.08)},thump(e,t){l(.25,400,60,Math.min(1,e/60)*Math.min(1.5,t),`lowpass`)},whoosh(e){l(.45,2400,300,.5*Math.min(1.5,e),`bandpass`)},chime(n){if(!e||!t)return;let r=e.currentTime,i=e.createOscillator();i.type=`triangle`,i.frequency.setValueAtTime(880,r),i.frequency.setValueAtTime(1320,r+.08);let a=e.createGain();a.gain.setValueAtTime(.25*Math.min(1.5,n),r),a.gain.exponentialRampToValueAtTime(1e-4,r+.35),i.connect(a).connect(t),i.start(r),i.stop(r+.35)}}}var ow=[`juice`],sw=X.num(`juice.master`,1,{min:0,max:2,hardMin:0,hardMax:10,tags:ow,desc:`scales every effect`});function cw(e,t,n=!0,r=1){let i=[`juice`,e];return{enabled:X.bool(`juice.${e}.enabled`,n,{tags:i,desc:t}),intensity:X.num(`juice.${e}.intensity`,r,{min:0,max:3,hardMin:0,hardMax:20,tags:i})}}var lw=e=>e.enabled.value?e.intensity.value*sw.value:0,uw=(e,t,n)=>X.num(`juice.${e}`,t,{tags:ow,...n}),dw=cw(`shake`,`screen shake from hits (trauma)`),fw={decay:uw(`shake.decay`,1.6,{min:.1,max:6,hardMin:.01,unit:`/s`,desc:`trauma lost per second`}),freq:uw(`shake.freq`,16,{min:1,max:40,hardMin:.1,unit:`Hz`}),angle:uw(`shake.angle`,.05,{min:0,max:.3,hardMin:0,unit:`rad`,desc:`rotation at full trauma`}),offset:uw(`shake.offset`,.4,{min:0,max:3,hardMin:0,unit:`m`,desc:`movement at full trauma`}),perSpeed:uw(`shake.perSpeed`,.02,{min:0,max:.1,hardMin:0,desc:`trauma added per m/s of impact`})},pw=cw(`fov`,`field of view widens with speed and boost`),mw={speed:uw(`fov.speed`,10,{min:0,max:40,hardMin:0,unit:`°`,desc:`extra FOV at max speed`}),boost:uw(`fov.boost`,8,{min:0,max:40,hardMin:0,unit:`°`}),from:uw(`fov.from`,.4,{min:0,max:.95,hardMin:0,hardMax:.99,desc:`kick starts at this fraction of max speed`}),response:uw(`fov.response`,5,{min:.5,max:30,hardMin:.01,unit:`/s`})},hw=cw(`speedLines`,`streaks from the screen edges at speed`),gw={from:uw(`speedLines.from`,.5,{min:0,max:1.5,hardMin:0,desc:`appear above this fraction of max speed`}),count:X.int(`juice.speedLines.count`,70,{min:0,max:300,hardMin:0,hardMax:2e3,tags:ow})},_w=cw(`hitStop`,`brief freeze on a hard hit`),vw={ms:uw(`hitStop.ms`,60,{min:0,max:300,hardMin:0,unit:`ms`}),threshold:uw(`hitStop.threshold`,25,{min:0,max:200,hardMin:0,unit:`m/s`,desc:`impacts below this don’t freeze`})},yw=cw(`nearMiss`,`slow motion when you just clear an obstacle`),bw={scale:uw(`nearMiss.scale`,.35,{min:.05,max:1,hardMin:.01,hardMax:1,desc:`time scale at the start of the slow-mo`}),duration:uw(`nearMiss.duration`,.6,{min:0,max:3,hardMin:0,unit:`s`})},xw=cw(`camLag`,`chase camera trails behind when accelerating and overshoots`),Sw={freq:uw(`camLag.freq`,1.6,{min:.2,max:8,hardMin:.05,unit:`Hz`}),damping:uw(`camLag.damping`,.45,{min:.05,max:2,hardMin:.01,desc:`below 1 overshoots`}),gain:uw(`camLag.gain`,.03,{min:0,max:.2,hardMin:0,unit:`s²`,desc:`offset per m/s² of acceleration`}),max:uw(`camLag.max`,3,{min:0,max:15,hardMin:0,unit:`m`})},Cw=cw(`bank`,`ship model leans into turns (visual only)`),ww={gain:uw(`bank.gain`,.35,{min:0,max:2,hardMin:0,unit:`s`}),max:uw(`bank.max`,.7,{min:0,max:1.5,hardMin:0,unit:`rad`})},Tw=cw(`trails`,`glowing ribbons from the wing tips`),Ew={length:X.int(`juice.trails.length`,40,{min:2,max:200,hardMin:2,hardMax:1e3,tags:ow,desc:`samples (frames) per trail`}),width:uw(`trails.width`,.35,{min:0,max:3,hardMin:0,unit:`m`})},Dw=cw(`sparks`,`sparks while scraping a wall and on impacts`),Ow={rate:uw(`sparks.rate`,300,{min:0,max:2e3,hardMin:0,unit:`/s`}),size:uw(`sparks.size`,.5,{min:.05,max:3,hardMin:.01,unit:`m`})},kw=cw(`flash`,`screen flash and HUD pop on checkpoints`),Aw={strength:uw(`flash.strength`,.3,{min:0,max:1,hardMin:0,hardMax:1}),duration:uw(`flash.duration`,.25,{min:.02,max:2,hardMin:.01,unit:`s`})},jw=cw(`lens`,`chromatic aberration and vignette with speed and hits`),Mw={aberration:uw(`lens.aberration`,.006,{min:0,max:.05,hardMin:0,desc:`RGB split at max speed`}),vignette:uw(`lens.vignette`,.35,{min:0,max:1,hardMin:0,hardMax:1})},Nw=cw(`audio`,`engine pitch, impacts, near-miss whoosh, checkpoint chime`,!1),Pw={volume:uw(`audio.volume`,.5,{min:0,max:1,hardMin:0,hardMax:1})},Fw=200;function Iw(e,t){let n=new QC,r=new tw,i=aw(),a=0,o=0,s=0,c=0,l=[0,1,2].map(()=>({x:0,v:0})),u=new W,d=new W,f=!1,p=document.createElement(`canvas`);p.id=`speed-lines`,document.body.appendChild(p);let m=p.getContext(`2d`),h=document.createElement(`div`);h.id=`juice-flash`,document.body.appendChild(h);let g=Array.from({length:2e3},()=>({a:Math.random()*Math.PI*2,r:Math.random(),v:.6+Math.random()})),_=!1,v=[new W(-2.1,0,1.4),new W(2.1,0,1.4)],y=new br({vertexColors:!0,blending:2,transparent:!0,depthWrite:!1,side:2}),b=new q,x=v.map(()=>{let t=new cr;t.setAttribute(`position`,new qn(new Float32Array(1200),3)),t.setAttribute(`color`,new qn(new Float32Array(1200),3));let n=[];for(let e=0;e<199;e++)n.push(2*e,2*e+1,2*e+2,2*e+1,2*e+3,2*e+2);t.setIndex(n);let r=new Mr(t,y);return r.frustumCulled=!1,r.layers.set(1),e.add(r),{mesh:r,geo:t,hist:[]}}),S=new iw(600),C=new cr,w=new qn(S.pos,3),T=new qn(new Float32Array(S.capacity*3),3);C.setAttribute(`position`,w),C.setAttribute(`color`,T);let E=new ci({vertexColors:!0,blending:2,transparent:!0,depthWrite:!1,size:.5}),D=new pi(C,E);D.frustumCulled=!1,D.layers.set(1),e.add(D);let O=(e,t,n,r)=>{for(let i=0;i<n;i++)S.emit(e.x,e.y,e.z,t.x*.5+(Math.random()*2-1)*r,t.y*.5+(Math.random()*2-1)*r,t.z*.5+(Math.random()*2-1)*r,.25+Math.random()*.45)},ee=new lt,k=new W,te=new W,ne=new W(0,0,1),A=0,j=null;return{event(e,t,a){if(e.type===`hit`){let o=lw(dw);n.add(e.impact*fw.perSpeed.value*o);let s=lw(_w);s>0&&e.impact>=vw.threshold.value&&r.hitStop(vw.ms.value/1e3*Math.min(s,3));let l=lw(Dw);l>0&&a&&O(a,t.vel,Math.round(Math.min(80,e.impact)*l),12),c=Math.min(1,c+e.impact/60),lw(Nw)>0&&i.thump(e.impact,lw(Nw))}else if(e.type===`nearMiss`){let e=lw(yw);e>0&&r.slowMo(1-(1-bw.scale.value)*Math.min(1,e),bw.duration.value*Math.min(e,2)),n.add(.08*lw(dw)),lw(Nw)>0&&i.whoosh(lw(Nw))}else if(e.type===`gate`&&!e.ok||e.type===`timeout`)n.add(.3*lw(dw)),c=Math.min(1,c+.4),lw(Nw)>0&&i.thump(25,lw(Nw));else if(e.type===`oob`)return;else if(e.type===`pad`){n.add((e.kind===`boost`?.12:.06)*lw(dw)),lw(Nw)>0&&(e.kind===`boost`?i.whoosh(lw(Nw)):i.thump(8,lw(Nw)));return}else if(e.type===`route`){e.kind&&lw(Nw)>0&&i.whoosh(lw(Nw));return}else lw(kw)>0&&(s=Aw.duration.value,j??=document.querySelector(`#race-hud .time`),j&&(j.style.setProperty(`--pop`,String(1+.25*Math.min(lw(kw),3))),j.classList.remove(`pop`),j.offsetWidth,j.classList.add(`pop`))),lw(Nw)>0&&i.chime(lw(Nw))},timeScale(e){return r.step(e)},frame(e){let{dt:r,camera:y,ship:C}=e;a+=r;let D=C.vel.length(),j=D/Math.max(e.maxSpeed,1e-6),M=+!!C.boosting;f&&r>0&&d.lerp(k.subVectors(C.vel,u).divideScalar(r),1-Math.exp(-12*r)),u.copy(C.vel),f=!0;let N=e.chase?lw(xw):0,re=k.copy(d).multiplyScalar(-Sw.gain.value*N);re.length()>Sw.max.value&&re.setLength(Sw.max.value),[`x`,`y`,`z`].forEach((e,t)=>ew(l[t],re[e],Sw.freq.value,Sw.damping.value,r)),y.position.x+=l[0].x,y.position.y+=l[1].x,y.position.z+=l[2].x,n.step(r,fw.decay.value);let P=n.shake;if(P>0){let e=fw.freq.value;y.rotateX(fw.angle.value*P*$C(a,e,1)),y.rotateY(fw.angle.value*P*$C(a,e,2)),y.rotateZ(fw.angle.value*P*$C(a,e,3)),y.translateX(fw.offset.value*P*$C(a,e,4)),y.translateY(fw.offset.value*P*$C(a,e,5))}let ie=nw(D,e.maxSpeed,M,{speed:mw.speed.value,boost:mw.boost.value,from:mw.from.value})*lw(pw);o+=(ie-o)*(1-Math.exp(-mw.response.value*r)),Math.abs(o)>.001&&(y.fov=Math.min(170,y.fov+o),y.updateProjectionMatrix());let ae=lw(Cw);ae>0&&e.shipModel.quaternion.multiply(ee.setFromAxisAngle(ne,rw(C.angVel.y,ww.gain.value*ae,ww.max.value)));let oe=lw(Tw),se=Math.min(Fw,Ew.length.value);b.set(t()).multiplyScalar(2*Math.min(1,oe)*Math.min(1,j)),x.forEach((t,n)=>{if(t.mesh.visible=oe>0,!t.mesh.visible){t.hist.length=0;return}let r=v[n].clone().applyQuaternion(e.shipModel.quaternion).add(e.shipModel.position),i=te.set(1,0,0).applyQuaternion(e.shipModel.quaternion).clone();t.hist.unshift({p:r,side:i}),t.hist.length>se&&(t.hist.length=se);let a=t.geo.attributes.position,o=t.geo.attributes.color,s=Ew.width.value*Math.min(oe,3);for(let e=0;e<Fw;e++){let n=t.hist[Math.min(e,t.hist.length-1)],r=e<t.hist.length?1-e/se:0,i=Math.min(1,Math.max(0,(n.p.distanceTo(y.position)-4)/10)),c=r*r*i,l=s*r;a.setXYZ(2*e,n.p.x+n.side.x*l,n.p.y+n.side.y*l,n.p.z+n.side.z*l),a.setXYZ(2*e+1,n.p.x-n.side.x*l,n.p.y-n.side.y*l,n.p.z-n.side.z*l),o.setXYZ(2*e,b.r*c,b.g*c,b.b*c),o.setXYZ(2*e+1,b.r*c,b.g*c,b.b*c)}a.needsUpdate=!0,o.needsUpdate=!0});let ce=lw(Dw);if(e.scrape&&ce>0&&D>5){A+=Ow.rate.value*ce*r*Math.min(1,D/60);let t=Math.floor(A);A-=t,O(e.scrape,C.vel,t,6)}S.step(r,3);for(let e=0;e<S.capacity;e++){let t=S.maxLife[e]>0?S.life[e]/S.maxLife[e]:0;T.setXYZ(e,3*t,1.8*t*t,.6*t*t*t)}w.needsUpdate=!0,T.needsUpdate=!0,E.size=Ow.size.value;let F=lw(hw),I=Math.max(0,Math.min(1,(j-gw.from.value)/Math.max(1-gw.from.value,.05)))*Math.min(F,2)+M*.3*Math.min(F,2);if(m){if((p.width!==innerWidth||p.height!==innerHeight)&&(p.width=innerWidth,p.height=innerHeight),I>.01){let e=p.width,t=p.height,n=Math.hypot(e,t)/2;m.clearRect(0,0,e,t),m.strokeStyle=`rgba(255,255,255,${Math.min(.6,.35*I)})`,m.lineWidth=1.5,m.beginPath();let i=Math.min(g.length,Math.round(gw.count.value*Math.min(1.5,I)));for(let a=0;a<i;a++){let i=g[a];i.r+=i.v*r*(1+j*2),i.r>1&&(i.r=.35+Math.random()*.2,i.a=Math.random()*Math.PI*2);let o=Math.max(.35,i.r)*n,s=o+n*.12*I*i.v,c=Math.cos(i.a),l=Math.sin(i.a);m.moveTo(e/2+c*o,t/2+l*o),m.lineTo(e/2+c*s,t/2+l*s)}m.stroke(),_=!0}else _&&=(m.clearRect(0,0,p.width,p.height),!1)}s=Math.max(0,s-r);let le=Aw.duration.value>0?s/Aw.duration.value:0;h.style.opacity=String(le*Aw.strength.value*Math.min(1,lw(kw))),c=Math.max(0,c-r*3);let ue=Math.min(lw(jw),3);eC.aberration=Mw.aberration.value*ue*(Math.min(j,1.5)**2+M*.5+c*2),eC.vignette=Mw.vignette.value*Math.min(1,ue)*(.4+.4*Math.min(j,1)+c);let de=lw(Nw);i.enable(de>0,Pw.volume.value*Math.min(1,de)),i.engine(j,M,de)},reset(){f=!1,d.set(0,0,0);for(let e of l)e.x=e.v=0;for(let e of x)e.hist.length=0;S.life.fill(0)}}}var Lw=()=>Zy.value===`gauntlet`?`kocmoc.best.gauntlet.${JSON.stringify([_b.value,Gx.value])}`:Zy.value===`proving`?`kocmoc.best.proving.${JSON.stringify([_b.value,EC.value])}`:`kocmoc.best.${JSON.stringify(_b.value)}${bb()?`|routes${JSON.stringify(vb.value)}`:``}${yb.value.count>0?`|sections${JSON.stringify(yb.value)}`:``}${Jx.value.count>0?`|hazards${JSON.stringify(Jx.value)}`:``}${fS.value.length?`|pads${JSON.stringify([dS.value,mS()])}`:``}${gS.value.length?`|movers${JSON.stringify(hS.value)}`:``}`,Rw=()=>Lw().replace(`kocmoc.best.`,`kocmoc.ghost.`),zw=`kocmoc.proving.ladder`;function Bw(){try{return BC(JSON.parse(localStorage.getItem(`kocmoc.proving.ladder`)??`null`))}catch{return{}}}var Vw=Fy.find(e=>e.id===`feel/balanced`);function Hw(){let e=X.snapshot(),t=Ly(X,`preset:feel`),n=t?t.name:Object.keys(e[`preset:feel`]??{}).length===0?`balanced`:null,r=e.user??{};return Vw&&Object.keys(Vw.vars).some(e=>e in r)?null:n}function Uw(e,t){let n=zC(e,By),r=Fy.find(e=>e.id===`feel/${t}`);if(!n||!r)return;let i=X.snapshot().user??{},a=Object.keys(r.vars).filter(e=>e in i);a.length&&X.change(a.map(e=>({layer:`user`,path:e,before:i[e],after:void 0}))),Iy(X,r),Yy(X,n)}function Ww(){let e=X.snapshot().scenario??{},t=Object.keys(e);return Vy().find(n=>{let r=Uy(n);return t.length===Object.keys(r).length&&t.every(t=>ud(e[t],r[t]))})?.name??null}var Gw={best:`BEST`,last:`LAST`,bot:`AUTOPILOT`};function Kw(e,t){let n=new br({transparent:!0,depthWrite:!1}),r=t.clone(!0);r.traverse(e=>{e instanceof Mr&&(e.material=n)}),r.visible=!1,e.add(r);let i=()=>{let t=n.clone(),i=r.clone(!0);return i.traverse(e=>{e instanceof Mr&&(e.material=t)}),e.add(i),{model:i,mat:t}};return{best:{model:r,mat:n},last:i(),bot:i()}}function qw(e,t,n,r){let i=document.createElement(`button`);return i.id=e,i.addEventListener(`click`,()=>{i.blur(),r()}),document.body.appendChild(i),id(()=>{let e=n.value.split(`,`).filter(Boolean);i.textContent=e.length?`${t} (${i_(e[0].trim())})`:t}),i}var Jw=`modulepreload`,Yw=function(e,t){return new URL(e,t).href},Xw={},Zw=function(e){return e.pathname.endsWith(`.css`)},Qw=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Yw(t,n);let r=s(t);if(r.href in Xw)return;Xw[r.href]=!0;let i=Zw(r);if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let o=document.createElement(`link`);if(o.rel=i?`stylesheet`:Jw,i||(o.as=`script`),o.crossOrigin=``,o.href=r.href,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),i)return new Promise((e,t)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${r}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},$w=X.color(`render.light.color`,`#ffffff`,{tags:[`render`]}),eT=X.num(`render.light.intensity`,3,{min:0,max:10,hardMin:0,tags:[`render`]}),tT=X.vec3(`render.light.dir`,[1,1.5,1],{tags:[`render`],desc:`direction towards the light`}),nT=X.num(`render.ambient`,.25,{min:0,max:2,hardMin:0,tags:[`render`]}),rT=matchMedia(`(pointer: coarse)`).matches,iT=X.num(`render.pixelRatio`,rT?1.5:2,{min:.5,max:3,hardMin:.25,hardMax:4,tags:[`render`,`perf`],desc:`max render resolution per CSS pixel (capped by the screen)`}),aT=X.int(`sim.rate`,120,{min:30,max:240,hardMin:10,hardMax:1e3,unit:`Hz`,tags:[`sim`],desc:`fixed physics steps per second`}),oT=X.num(`time.scale`,1,{min:.05,max:4,hardMin:0,hardMax:16,unit:`×`,tags:[`sim`,`debug`]}),sT=X.bool(`time.paused`,!1,{tags:[`sim`,`debug`]}),cT=X.bool(`debug.inputViz`,!1,{tags:[`debug`,`input`],desc:`input visualizer (F3)`}),lT=X.str(`input.key.inputViz`,`F3`,{tags:[`input`,`keys`],desc:`KeyboardEvent.code, comma-separated`}),uT=[`ship`,`feel`],dT=X.bool(`ship.flightAssist`,!0,{tags:uT,desc:`on: velocity follows the nose; off: Newtonian drift (F)`}),fT={thrust:X.num(`ship.thrust.forward`,60,{min:0,max:300,hardMin:0,unit:`m/s²`,tags:uT}),reverse:X.num(`ship.thrust.reverse`,40,{min:0,max:300,hardMin:0,unit:`m/s²`,tags:uT}),strafe:X.num(`ship.thrust.strafe`,35,{min:0,max:300,hardMin:0,unit:`m/s²`,tags:uT}),turnRate:X.vec3(`ship.turn.rate`,[1.8,1.4,3],{tags:uT,unit:`rad/s`,desc:`pitch, yaw, roll`}),turnResponse:X.num(`ship.turn.response`,8,{min:.5,max:40,hardMin:.01,unit:`/s`,tags:uT,desc:`how fast turn rate follows input`}),maxSpeed:X.num(`ship.speed.max`,120,{min:10,max:600,hardMin:1,unit:`m/s`,tags:uT}),overspeedDecay:X.num(`ship.speed.overspeedDecay`,1.5,{min:.1,max:10,hardMin:0,unit:`/s`,tags:uT,desc:`how fast speed above the cap bleeds off`}),boostThrust:X.num(`ship.boost.thrust`,160,{min:0,max:600,hardMin:0,unit:`m/s²`,tags:uT}),boostSpeed:X.num(`ship.boost.speed`,240,{min:10,max:1200,hardMin:1,unit:`m/s`,tags:uT}),boostDrain:X.num(`ship.boost.drain`,.35,{min:0,max:2,hardMin:0,unit:`/s`,tags:uT,desc:`energy used per second (1 = full tank)`}),boostRegen:X.num(`ship.boost.regen`,.15,{min:0,max:2,hardMin:0,unit:`/s`,tags:uT}),assistDamp:X.num(`ship.assist.damp`,2.5,{min:.1,max:20,hardMin:0,unit:`/s`,tags:uT,desc:`how fast flight assist kills drift`})},pT=()=>({thrust:fT.thrust.value,reverse:fT.reverse.value,strafe:fT.strafe.value,turnRate:fT.turnRate.value,turnResponse:fT.turnResponse.value,maxSpeed:fT.maxSpeed.value,overspeedDecay:fT.overspeedDecay.value,boostThrust:fT.boostThrust.value,boostSpeed:fT.boostSpeed.value,boostDrain:fT.boostDrain.value,boostRegen:fT.boostRegen.value,assist:dT.value,assistDamp:fT.assistDamp.value}),mT=[`race`,`feel`],hT=X.num(`race.wall.bounce`,.3,{min:0,max:1,hardMin:0,hardMax:2,tags:mT,desc:`share of into-wall speed bounced back`}),gT=X.num(`race.wall.scrape`,.8,{min:0,max:10,hardMin:0,unit:`/s`,tags:mT,desc:`speed lost while touching the wall`}),_T=X.num(`race.spawn.t`,0,{min:0,max:1,hardMin:0,hardMax:1,tags:[`race`],desc:`spawn position as a fraction of the lap (0 = just behind the start line)`}),vT=X.num(`race.spawn.speed`,0,{min:0,max:400,hardMin:0,unit:`m/s`,tags:[`race`]}),yT=X.bool(`bot.enabled`,!1,{tags:[`bot`],desc:`autopilot flies the track (P)`}),bT=X.enum(`bot.route`,`shortcut`,xm,{tags:[`bot`,`route`],desc:`which branches the autopilot takes at forks: main never leaves the loop; shortcut takes shortcuts and hidden routes; long takes the long way, splits and the pit lane`}),xT=X.num(`race.pit.refill`,.5,{min:0,max:5,hardMin:0,unit:`/s`,tags:[`race`,`route`],desc:`share of full boost the pit lane refills per second`}),ST=X.num(`race.pit.speed`,60,{min:10,max:300,hardMin:1,unit:`m/s`,tags:[`race`,`route`],desc:`pit lane speed limit (faster bleeds off)`}),CT=X.bool(`race.ghost.enabled`,!0,{tags:[`race`,`ghost`],desc:`race your best lap on this track`}),wT=X.num(`race.ghost.opacity`,.35,{min:0,max:1,hardMin:0,hardMax:1,tags:[`race`,`ghost`]}),TT=X.color(`race.ghost.color`,`#7fe7ff`,{tags:[`race`,`ghost`]}),ET=X.int(`race.laps`,3,{min:0,max:20,hardMin:0,hardMax:999,tags:[`race`],desc:`laps to the finish; 0 = endless practice`}),DT=X.bool(`race.rival.last`,!0,{tags:[`race`,`ghost`],desc:`race your last lap this session too`}),OT=X.color(`race.rival.lastColor`,`#ffd166`,{tags:[`race`,`ghost`]}),kT=X.bool(`race.rival.bot`,!0,{tags:[`race`,`ghost`],desc:`race a lap the autopilot flew from a standing start`}),AT=X.color(`race.rival.botColor`,`#b388ff`,{tags:[`race`,`ghost`]}),jT=X.enum(`race.rival.botRoute`,`shortcut`,xm,{tags:[`race`,`ghost`,`route`],desc:`which branches the autopilot rival takes at forks (see bot.route)`}),MT=[`velocity`,`accel`,`collision`,`frames`,`checkpoints`,`nearest`].map(e=>X.bool(`debug.gizmo.${e}`,!1,{tags:[`debug`,`gizmo`]}));yd(X);var NT=new URLSearchParams(location.search),PT=Number(NT.get(`seed`));NT.has(`seed`)&&Number.isFinite(PT)&&X.change([{layer:`user`,path:`gen.race.seed`,before:X.layerValue(`user`,`gen.race.seed`),after:Math.round(PT)}],!1);var FT=new Mu({antialias:!0});document.body.appendChild(FT.domElement),FT.info.autoReset=!1;var IT=tC(FT),LT=new mn,RT=px(LT),zT=new Uo(70,1,.1,12e3),BT=new Ko,VT=new qo(8952319);LT.add(BT,VT);var HT=jv();LT.add(HT.object);var UT=Kw(LT,HT.object),WT=Bv(LT),GT=Pb(LT),KT=Yb(LT),qT=Nx(LT),JT=Qx(LT),YT=bS(LT),XT=FC(LT),ZT=Iw(LT,()=>X.get(`ship.glow`)?.value??`#7fe7ff`),QT=xx(),$T=cC(FT,LT,RT),eE=OS(QT.elements),tE=pv();function nE(){FT.setPixelRatio(Math.min(devicePixelRatio,iT.value)),FT.setSize(innerWidth,innerHeight),IT.setSize(innerWidth,innerHeight),zT.aspect=innerWidth/innerHeight,zT.updateProjectionMatrix()}addEventListener(`resize`,nE),screen.orientation?.addEventListener(`change`,nE),id(nE);var rE=tm(),iE=rE.prev,aE=rE.curr,oE=Cd(),sE=Sd(),cE=new xd(1/aT.value);id(()=>void(cE.step=1/aT.value));var Q=null,lE=()=>({shipRadius:Px.value,bounce:hT.value,scrape:gT.value,open:cb(),oobTime:lb.value}),uE=null,dE=null,fE=new Map,pE=new Map,mE=()=>`${Lw()}|${JSON.stringify(pT())}${Z.value.branches?.length?`|${jT.value}`:``}`,hE=e=>({...Sm,route:e}),gE,_E=``,vE={best:null,last:null},yE=[],bE=``;function xE(){if(!Q||!Qy()||Zy.value===`proving`){yE=[],bE=``;return}let e=Q.laps===0,t=DT.value?e?fE.get(Lw())??null:vE.last:null,n=kT.value?pE.get(mE())??null:null,r=[[`best`,CT.value?e?dE:vE.best:null],[`last`,t],[`bot`,n]],i=r.map(([e,t])=>t?`${e}${t.lap}`:``).join(`,`)+Z.value.length;i!==bE&&(bE=i,yE=r.filter(e=>!!e[1]).map(([e,t])=>({kind:e,rival:Vm(Gw[e],t,Z.value)})))}function SE(){let e=mE();if(!kT.value||!Qy()||Zy.value===`proving`||pE.has(e)||_E===e)return;clearTimeout(gE),_E=e;let t=DE(),n=Gm(t,vm(t.course),cE.step,600,hE(jT.value)),r=()=>{if(e!==mE()){_E=``;return}let t=performance.now();for(;performance.now()-t<4;){let t=n.next();if(t.done){pE.set(e,t.value),_E=``;return}}gE=setTimeout(r,0)};gE=setTimeout(r,200)}var CE=new mm,wE=null,$=null;function TE(e,t){if(!Qy())return{s:0,speed:t};let n=Z.value.length;return{s:e===0?-Math.min(30,n*.05):e*n,speed:t}}function EE(e=_T.value,t=vT.value,n){ZT.reset(),CE.reset();let r=n??TE(e,t);if(nm(rE,Qy()?Z.value:null,r,ET.value),Q=rE.race,dE=null,Q){try{let e=JSON.parse(localStorage.getItem(Lw())??`null`);e&&typeof e.lap==`number`&&Array.isArray(e.splits)&&(Q.bestLap=e.lap,Q.bestSplits=e.splits),dE=gm(JSON.parse(localStorage.getItem(Rw())??`null`))}catch{}uE=Q.bestLap}vE={best:dE,last:fE.get(Lw())??null},kE=null,wE=$?null:new cm(X.snapshot(),r,cE.step),SE()}var DE=()=>{let e=Yx.value,t=OC.value,n=fS.value,r=gS.value;return{ship:pT(),walls:lE(),track:Qy()?Z.value:null,course:e||t||Z.value.branches?.length||n.length||r.length?{gauntlet:e??void 0,proving:t?{course:t,rules:DC()}:void 0,nearMiss:Fx.value,pit:{refill:xT.value,speed:ST.value},pads:n.length?{list:n,fx:mS(),lanes:pS.value}:void 0,movers:r.length?r:void 0}:void 0}},OE=Bw(),kE=null,AE=GC({ladder:()=>OE,ship:Hw,play:Uw}),jE=XC({venues:()=>Vy(),current:Ww,play:e=>Yy(X,e)});function ME(e){if(!$)return;EE(0,0,$.rec.spawn),$.player=new lm($.rec);let t=DE(),n=$.rec.step;for(;$.player.tick<e&&$.player.next(sE);)rm(rE,sE,t,n),Q&&(Q.events.length=0);cE.reset()}function NE(e){$={rec:e,player:new lm(e),playing:!0,speed:1},X.restore(e.layers),ME(0)}function PE(){$=null,EE()}function FE(e,t){let n=document.createElement(`a`);n.href=URL.createObjectURL(new Blob([JSON.stringify(t)],{type:`application/json`})),n.download=e,n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}function IE(e){let t=$?{...$.rec,ticks:$.player.tick,note:e??$.rec.note}:wE?.finish({note:e});t&&($&&(t.inputs=im($.rec.inputs,t.ticks)),FE(`kocmoc-repro-${Sb.value}-${t.ticks}.json`,t))}Km.replayRun=()=>{let e=wE?.finish();e&&e.ticks>0&&NE(e)},Km.saveRepro=IE,Km.playRecording=NE;var LE=qm({toggle:()=>$&&($.playing=!$.playing),seek:e=>ME(e),speed:e=>$&&($.speed=e),save:()=>IE(),exit:PE});id(()=>{Z.value,Zy.value,Yx.value,fS.value,gS.value,OC.value,ET.value,$||EE()}),id(()=>{kT.value&&SE()}),id(()=>{let e=new URL(location.href);Qy()?e.searchParams.set(`seed`,String(Sb.value)):e.searchParams.delete(`seed`),history.replaceState(null,``,e.pathname+e.search+e.hash)}),Gy(({trackT:e,speed:t})=>EE(e,t)),qy(()=>({trackT:Q?Q.near.s/Z.value.length:0,speed:aE.vel.length()}));var RE=NT.get(`scenario`);if(RE){let e=By.find(e=>e.name===RE);e?Yy(X,e):console.warn(`kocmoc: no scenario named ${RE}`)}addEventListener(`dragover`,e=>e.preventDefault()),addEventListener(`drop`,async e=>{e.preventDefault();let t=e.dataTransfer?.files[0];if(t)try{let e=JSON.parse(await t.text()),n=um(e);if(n){NE(n);return}let r=Hy(e);r?Yy(X,r):console.warn(`kocmoc: dropped file is not a scenario`)}catch{console.warn(`kocmoc: dropped file is not valid JSON`)}}),Jg(FT.domElement),Wg(pg,()=>$?ME(0):EE()),Wg(TS,()=>wS.set(!wS.value)),Wg(mg,()=>yT.set(!yT.value)),Wg(hg,()=>$?$.playing=!$.playing:Km.replayRun()),Wg(lg,()=>dT.set(!dT.value)),Wg(ug,sv),Wg(dg,lv),Wg(lT,()=>cT.set(!cT.value)),Wg(gg,()=>AE.toggle()),Wg(vg,()=>jE.toggle()),Wg(_g,()=>{Q?.proving?.result===`clear`&&Uw(vC.value+1,Hw()??`balanced`)}),qw(`levels-btn`,`Levels`,gg,()=>AE.toggle()),qw(`tracks-btn`,`Tracks`,vg,()=>jE.toggle());var zE,BE=()=>void(zE??=Qw(()=>import(`./controls-BGBHp22g.js`),__vite__mapDeps([0,1,2]),import.meta.url)).then(e=>e.toggle());Wg(fg,BE),qw(`controls-btn`,`Controls`,fg,BE),oh();var VE;id(()=>{let e=ih.value;(e||VE)&&(VE??=Qw(()=>import(`./touch-DHeWgDA1.js`),__vite__mapDeps([3,4]),import.meta.url)).then(t=>{t.mount({respawn:()=>EE(),camera:sv,assist:()=>dT.set(!dT.value),debug:()=>void tD(),levels:()=>AE.toggle(),tracks:()=>jE.toggle()}),t.show(e)})});var HE,UE=!1;id(()=>{!UE&&MT.some(e=>e.value)&&(UE=!0,Qw(()=>import(`./gizmos-BIGq9QFE.js`).then(e=>{HE=e.createGizmos({scene:LT,ship:()=>oE,prevShip:()=>iE,step:()=>cE.step,track:()=>Qy()?Z.value:null,near:()=>Q?.near??null,shipRadius:()=>Px.value})}),[],import.meta.url))});var WE;id(()=>{let e=cT.value;(e||WE)&&(WE??=Qw(()=>import(`./inputViz-ByjmFBEF.js`),[],import.meta.url)).then(t=>t.show(e))});var GE=0,KE=0;X.watch(`perf.fps`,()=>Math.round(GE),{tags:[`perf`]}),X.watch(`perf.frameMs`,()=>KE.toFixed(2),{tags:[`perf`],unit:`ms`}),X.watch(`perf.drawCalls`,()=>FT.info.render.calls,{tags:[`perf`]}),X.watch(`perf.triangles`,()=>FT.info.render.triangles,{tags:[`perf`]}),X.watch(`sim.ticks`,()=>cE.ticks,{tags:[`sim`]}),X.watch(`ship.speed`,()=>aE.vel.length().toFixed(1),{tags:[`ship`],unit:`m/s`}),X.watch(`ship.energy`,()=>aE.energy.toFixed(2),{tags:[`ship`]}),X.watch(`ship.pos`,()=>aE.pos.toArray().map(e=>e.toFixed(0)).join(`, `),{tags:[`ship`]}),X.watch(`race.track.length`,()=>Z.value.length.toFixed(0),{tags:[`race`],unit:`m`}),X.watch(`race.track.attempts`,()=>Z.value.attempts,{tags:[`race`],desc:`layouts tried before one passed the checks`}),X.watch(`race.progress`,()=>Q?(Q.near.s/Z.value.length).toFixed(3):`–`,{tags:[`race`]}),X.watch(`race.wallDist`,()=>Q?(Q.loc.radius-Q.near.dist).toFixed(1):`–`,{tags:[`race`],unit:`m`,desc:`distance to the wall`}),X.watch(`race.wallHits`,()=>Q?.wallHits??0,{tags:[`race`]}),X.watch(`race.obstacleHits`,()=>Q?.obstacleHits??0,{tags:[`race`,`gauntlet`]}),X.watch(`proving.timeLeft`,()=>Q?.proving?Q.proving.timeLeft.toFixed(1):`–`,{tags:[`proving`],unit:`s`}),X.watch(`proving.gates`,()=>Q?.proving?`${Q.proving.hits} hit, ${Q.proving.misses} missed of ${OC.value?.gates.length??0}`:`–`,{tags:[`proving`]}),X.watch(`race.oobResets`,()=>Q?.oobResets??0,{tags:[`race`],desc:`times out of bounds put the ship back (open space)`}),X.watch(`gauntlet.chunks`,()=>Yx.value?.chunks.length??0,{tags:[`gauntlet`]}),X.watch(`gauntlet.chunk`,()=>{let e=Yx.value,t=e&&Q&&e.chunks.find(e=>Q.near.s>=e.s0&&Q.near.s<e.s1);return t?`${t.kind} ${(t.difficulty*100).toFixed(0)}%`:`–`},{tags:[`gauntlet`],desc:`chunk under the ship and its difficulty`});var qE=new W,JE=new W;function YE(e){let t=e.proving,n=OC.value;if(!t||!n)return null;let r=DC(),i=Hw();return{level:vC.value,timeLeft:t.timeLeft,gates:n.gates.length,hits:t.hits,misses:t.misses,beacons:n.beacons.length,collected:t.collected,result:t.result,score:t.score,weights:{time:r.scoreTime,gate:r.scoreGate,beacon:r.scoreBeacon},best:i?OE[i]?.best[vC.value]??null:null,newBest:!!kE?.newBest,badge:!!kE?.badge,ship:i}}var XE=new Set;function ZE(){let e=Z.value.branches??[],t=e.some(e=>e.kind===`hidden`)?Lw():``;return e.map((e,n)=>e.kind===`hidden`?XE.has(`${t}#${n}`)?`#8a7fb0`:null:ab[e.kind].value)}function QE(e){let t=Z.value.branches;if(!t?.length)return null;let n=e=>e===`hidden`?`#ffffff`:ab[e].value;if(e.loc.route>=0){let r=t[e.loc.route].kind;return{text:ob[r],color:n(r)}}let r=Pf(Z.value,e.near.s,450);return r&&r.kind!==`hidden`?{text:`FORK · ${ob[r.kind]}`,color:n(r.kind)}:null}var $E=performance.now();FT.setAnimationLoop(e=>{let t=Math.min((e-$E)/1e3,.25);$E=e,GE+=(1/Math.max(t,1e-4)-GE)*.05;let n=performance.now();qg(t);let r=DE(),i=ZT.timeScale(sT.value?0:t),a=!$||$.playing&&!$.player.done,o=$?$.speed:1,s=cE.advance(sT.value||!a?0:t*oT.value*i*o,e=>{if($){if(!$.player.next(sE))return}else yT.value&&Q?Lm(aE,Z.value,Q.near,Q.time,sE,vm(r.course),hE(bT.value),Q.loc.route):Yg(sE,e),sm(sE),wE?.push(sE);if(rm(rE,sE,r,e),Q&&!$){let e=CE.update(Q,aE);if(e&&fE.set(Lw(),e),e&&Q.bestLap===e.lap){dE=e;try{localStorage.setItem(Rw(),JSON.stringify(e))}catch{}}}});LE.update({active:!!$,playing:!!$&&$.playing&&!$.player.done,tick:$?.player.tick??0,ticks:$?.rec.ticks??0,step:$?.rec.step??cE.step});let c=null;if(Q?.contact&&(c=qE.subVectors(aE.pos,Q.near.point).setLength(Q.loc.radius).add(Q.near.point)),Q){for(let e of Q.events){e.type===`route`&&e.kind===`hidden`&&XE.add(`${Lw()}#${e.branch}`);let t=e.type===`hit`?e.what===`wall`?c??aE.pos:Q.obstacle.point:void 0;ZT.event(e,aE,t),dv(e.type)}Q.events.length=0}if(Q?.proving?.result&&!kE){let e=Hw();if(kE={ladder:OE,newBest:!1,badge:!1},!$&&e&&(kE=VC(OE,e,vC.value,Q.proving.score,Q.proving.result===`clear`),kE.ladder!==OE)){OE=kE.ladder;try{localStorage.setItem(zw,JSON.stringify(OE))}catch{}}}Q&&!$&&Q.bestLap!==null&&Q.bestLap!==uE&&(uE=Q.bestLap,localStorage.setItem(Lw(),JSON.stringify({lap:Q.bestLap,splits:Q.bestSplits}))),Pd(oE,iE,aE,s),BT.color.set($w.value),BT.intensity=eT.value,BT.position.fromArray(tT.value),VT.intensity=nT.value,WT.update(Zy.value===`free`),GT.update(),KT.update(),xE();let l={best:TT.value,last:OT.value,bot:AT.value};for(let e of Object.keys(UT))UT[e].model.visible=!1,UT[e].mat.color.set(l[e]),UT[e].mat.opacity=wT.value;let u=Z.value.length,d=!!Q&&Q.laps>0;if(Q?.started){let e=Q.finished?0:(1-s)*cE.step,t=(d?Q.raceTime:Q.lapTime)-e;for(let{kind:e,rival:n}of yE){let r=UT[e].model,i=n.ghost.lap;d&&t>=Q.laps*i||(r.visible=hm(n.ghost,d?t%i:t,r.position,r.quaternion))}}JT.update(Q?Q.time-(1-s)*cE.step:0),YT.update(Q?Q.time-(1-s)*cE.step:0),XT.update(Q?Q.time:0,Q?.proving??null),HE?.update(),HT.object.position.copy(oE.pos),HT.object.quaternion.copy(oE.quat);let f=$&&g_.value?`cinematic`:V_.value;HT.object.visible=f!==`cockpit`,HT.update(oE.boosting?1:Math.max(0,sE.thrust));let p=$T.mainRect();zT.aspect!==p.w/p.h&&(zT.aspect=p.w/p.h,zT.updateProjectionMatrix()),v_.track=Q?Z.value:null,v_.near=Q?.near??null,v_.route=Q?.loc.route??-1,fv(zT,oE,t,zg.value,f),tE.update(f===`cinematic`,p),ZT.frame({dt:t,camera:zT,ship:oE,shipModel:HT.object,maxSpeed:fT.maxSpeed.value,chase:f===`chase`||f===`far`,scrape:c});let m=xg.value===`stick`&&!Bg.captured&&!ih.value&&!Lh.value?`Click to steer with the touchpad · arrows/WASD to fly`:``,h=Q&&{lap:Q.lap,started:Q.started,lapTime:Q.lapTime,lastLap:Q.lastLap,bestLap:Q.bestLap,delta:em(Q),checkpoint:Q.splits.length,checkpoints:Z.value.checkpoints.length,seed:Sb.value,laps:Q.laps,raceTime:Q.raceTime,finished:Q.finished,finishTime:Q.finishTime,lapTimes:Q.lapTimes,standings:Q.started&&yE.length?d?Q.finished?Wm(yE.map(e=>e.rival),Q.laps*u,Q.finishTime,u,Q.laps):Wm(yE.map(e=>e.rival),Math.min($p(Q,u),Q.laps*u),Q.raceTime,u,Q.laps):Wm(yE.map(e=>e.rival),Q.along,Q.lapTime,u,1):null,rivalTimes:d&&!Q.proving?yE.map(e=>({name:e.rival.name,time:e.rival.ghost.lap*Q.laps})):[],oob:Q.oob>0?Math.max(0,lb.value-Q.oob):null,route:QE(Q),proving:YE(Q)},g=e=>i_(e.value.split(`,`)[0]?.trim()??``),_=Q?.proving?ih.value?`tap respawn to fly again · LEVELS for the ladder`:`${g(pg)} retry${Q.proving.result===`clear`?` · ${g(_g)} next level`:``} · ${g(gg)} levels`:ih.value?`tap respawn to race again`:`${g(pg)} to race again`;QT.update(oE,{assist:dT.value,cam:f,cruise:Bg.cruise,hint:m,race:h,again:_}),eE.update({camera:zT,shipPos:oE.pos,shipQuat:oE.quat,track:Qy()?Z.value:null,nextCp:Q?.started?Q.nextCp===0?0:Z.value.checkpoints[Q.nextCp]:Q?0:null,target:Q?.proving&&OC.value&&!Q.proving.result?IC(OC.value,Q.proving,JE):null,branchColors:Qy()?ZE():[]}),qT.update(FT,oE,t,RT,zT,h||null),RT.update(zT,FT.getPixelRatio()),FT.info.reset(),IT.render(LT,zT,iC.value===`single`?void 0:p),$T.render(oE,t),KE=performance.now()-n});var eD,tD=e=>(eD??=Qw(()=>import(`./debug-Io0mIPfZ.js`),__vite__mapDeps([5,1,6]),import.meta.url)).then(t=>t.toggle(e));addEventListener(`keydown`,e=>{e.code===`Backquote`&&!(bd(e)&&e.target.closest(`#kocmoc-debug`)===null)&&(e.preventDefault(),document.pointerLockElement&&document.exitPointerLock(),tD())}),new URLSearchParams(location.search).has(`debug`)&&tD(!0);export{Yr as $,ph as A,ud as B,Lh as C,sh as D,lh as E,um as F,Fu as G,$u as H,bd as I,cr as J,Ju as K,_d as L,nh as M,Jm as N,dh as O,Km as P,ri as Q,vd as R,Ph as S,Ih as T,id as U,X as V,qu as W,on as X,Xn as Y,Ha as Z,bg as _,Ly as a,Ya as at,kh as b,Xg as c,i_ as d,si as et,e_ as f,Bg as g,Mg as h,By as i,W as it,rh as j,fh as k,$g as l,$h as m,Xy as n,br as nt,Iy as o,t_ as p,ps as q,Jy as r,Ka as rt,Fy as s,Yy as t,Mr as tt,n_ as u,gh as v,hh as w,Rh as x,Ch as y,ad as z};