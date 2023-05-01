var gdjs;(function(n){let a;(function(s){class r{constructor(t,e,i){this._linkElement=null;this._containerElement=null;this._backgroundElement=null;this._svgElement=null;this._usernameTextElement=null;this._madeWithTextElement=null;this._resizeObserver=null;this._displayDuration=20;this._changeTextDelay=7;this._fadeInDelayAfterGameLoaded=1;this._fadeDuration=.3;this._fadeOutTimeout=null;this._hideTimeout=null;this._fadeOutFirstTextTimeout=null;this._fadeInSecondTextTimeout=null;this._textFontSize=14;this._logoWidth=56;this._logoHeight=45;this._backgroundHeight=150;this._margin=10;this._gameId=t._data.properties.projectUuid,this._gameRenderer=t.getRenderer(),this._authorUsername=e[0],this._placement=i.placement,this._showAtStartup=i.showWatermark,this._isDevEnvironment=t.isUsingGDevelopDevelopmentEnvironment(),this.addStyle()}displayAtStartup(){this._showAtStartup&&this.display()}display(){const t=this._gameRenderer.getDomElementContainer();t&&(this.addWatermarkToGameContainer(t),this._resizeObserver=new ResizeObserver(()=>{const e=t.getBoundingClientRect();this.onResizeGameContainer(e.height)}),this._resizeObserver.observe(t))}updateFontSize(t){this._textFontSize=Math.max(.025*t,12)}updateLogoSize(t){this._logoWidth=Math.max(.06*t,25),this._logoHeight=Math.round(45/56*this._logoWidth)}updateBackgroundHeight(t){this._backgroundHeight=Math.max(.13*t,45)}updateMargin(t){this._margin=Math.max(.025*t,8)}onResizeGameContainer(t){this.updateFontSize(t),this._madeWithTextElement&&(this._madeWithTextElement.style.fontSize=`${this._textFontSize}px`),this._usernameTextElement&&(this._usernameTextElement.style.fontSize=`${this._textFontSize}px`),this.updateLogoSize(t),this._svgElement&&(this._svgElement.setAttribute("height",this._logoHeight.toString()),this._svgElement.setAttribute("width",this._logoWidth.toString())),this.updateBackgroundHeight(t),this._backgroundElement&&(this._backgroundElement.style.height=`${this._backgroundHeight}px`),this.updateMargin(t),this._linkElement&&this.updateElementMargins(this._linkElement)}addWatermarkToGameContainer(t){const e=t.getBoundingClientRect();this.updateFontSize(e.height),this.updateLogoSize(e.height),this.updateBackgroundHeight(e.height),this._containerElement=this.createDivContainer(),this.createBackground();const i=document.createElement("div");this.generateSVGLogo(e.height),this.createMadeWithTextElement(),this.createUsernameTextElement(),this._linkElement=this.createLinkElement(),this._svgElement&&this._containerElement.appendChild(this._svgElement),this._madeWithTextElement&&i.appendChild(this._madeWithTextElement),this._usernameTextElement&&i.appendChild(this._usernameTextElement),this._containerElement.appendChild(i),this._backgroundElement&&t.appendChild(this._backgroundElement),this._linkElement.append(this._containerElement),t.appendChild(this._linkElement),this.setupAnimations()}createBackground(){this._backgroundElement=document.createElement("div"),this._backgroundElement.setAttribute("id","watermark-background"),this._backgroundElement.style.height=`${this._backgroundHeight}px`,this._backgroundElement.style.opacity="0",this._placement.startsWith("top")?(this._backgroundElement.style.top="0",this._backgroundElement.style.backgroundImage="linear-gradient(180deg, rgba(38, 38, 38, .6) 0%, rgba(38, 38, 38, 0) 100% )"):(this._backgroundElement.style.bottom="0",this._backgroundElement.style.backgroundImage="linear-gradient(0deg, rgba(38, 38, 38, .6) 0%, rgba(38, 38, 38, 0) 100% )")}setupAnimations(){requestAnimationFrame(()=>{setTimeout(()=>{!this._containerElement||!this._backgroundElement||!this._linkElement||(this._containerElement.style.opacity="1",this._backgroundElement.style.opacity="1",this._linkElement.style.pointerEvents="all",this._svgElement&&this._svgElement.classList.add("spinning"))},this._fadeInDelayAfterGameLoaded*1e3)}),this._fadeOutTimeout=setTimeout(()=>{!this._containerElement||!this._backgroundElement||(this._containerElement.style.opacity="0",this._backgroundElement.style.opacity="0",this._hideTimeout=setTimeout(()=>{!this._containerElement||!this._backgroundElement||!this._linkElement||(this._linkElement.style.pointerEvents="none",this._containerElement.style.display="none",this._backgroundElement.style.display="none",this._resizeObserver&&this._resizeObserver.disconnect())},this._fadeDuration*1e3))},(this._fadeInDelayAfterGameLoaded+this._displayDuration)*1e3),this._fadeOutFirstTextTimeout=setTimeout(()=>{const{_madeWithTextElement:t,_usernameTextElement:e}=this;!t||e&&(t.style.opacity="0",this._fadeInSecondTextTimeout=setTimeout(()=>{e.style.lineHeight="normal",e.style.opacity="1",t.style.lineHeight="0"},this._fadeDuration*1e3))},(this._fadeInDelayAfterGameLoaded+this._changeTextDelay)*1e3)}createMadeWithTextElement(){this._madeWithTextElement=document.createElement("span"),this._madeWithTextElement.innerText="Made with GDevelop",this._madeWithTextElement.style.fontSize=`${this._textFontSize}px`}createUsernameTextElement(){!this._authorUsername||(this._usernameTextElement=document.createElement("span"),this._usernameTextElement.innerText=`@${this._authorUsername}`,this._usernameTextElement.style.fontSize=`${this._textFontSize}px`,this._usernameTextElement.style.opacity="0",this._usernameTextElement.style.lineHeight="0")}updateElementMargins(t){switch(this._placement){case"top-left":t.style.top=`${this._margin}px`,t.style.left=`${this._margin}px`;break;case"top-right":t.style.top=`${this._margin}px`,t.style.right=`${this._margin}px`;break;case"bottom-left":t.style.bottom=`${this._margin}px`,t.style.left=`${this._margin}px`;break;case"bottom-right":t.style.bottom=`${this._margin}px`,t.style.right=`${this._margin}px`;break;case"top":t.style.top=`${this._margin}px`,t.style.left="50%",t.style.transform="translate(-50%, 0)";break;case"bottom":default:t.style.bottom=`${this._margin}px`,t.style.left="50%",t.style.transform="translate(-50%, 0)";break}}createLinkElement(){const t=document.createElement("a");t.id="watermark-link";let e=this._authorUsername?new URL(`https://liluo.io/${this._authorUsername}`):new URL("https://liluo.io");return this._isDevEnvironment?e.searchParams.set("dev","true"):(e.searchParams.set("utm_source","gdevelop-game"),e.searchParams.set("utm_medium","game-watermark"),this._gameId&&e.searchParams.set("utm_campaign",this._gameId)),t.href=e.href,t.target="_blank",this.updateElementMargins(t),t}createDivContainer(){const t=document.createElement("div");return t.setAttribute("id","watermark"),t.style.opacity="0",t}generateSVGLogo(t){this._svgElement=document.createElementNS("http://www.w3.org/2000/svg","svg"),this.updateLogoSize(t),this._svgElement.setAttribute("height",this._logoHeight.toString()),this._svgElement.setAttribute("width",this._logoWidth.toString()),this._svgElement.setAttribute("viewBox","-2 -2 59 48"),this._svgElement.setAttribute("fill","none");const e=document.createElementNS("http://www.w3.org/2000/svg","path"),i=document.createElementNS("http://www.w3.org/2000/svg","path");e.setAttribute("d","M29.3447 33C25.1061 33 21.0255 31.8475 17.4207 29.3381C14.9081 27.5897 12 23.6418 12 16.9488C12 4.53178 18.3074 0 30.9827 0H53.8027L56 7.07232H32.7217C24.3558 7.07232 19.3813 7.72835 19.3813 16.9488C19.3813 19.9944 20.2354 22.1618 21.9933 23.574C24.9642 25.9612 30.7388 26.0628 34.2673 25.7208C34.2673 25.7208 35.715 21.0394 35.9534 20.2794C36.2327 19.3888 36.1104 19.1763 35.2392 19.1763C33.9808 19.1763 31.7185 19.1763 29.3175 19.1763C27.6349 19.1763 25.9818 18.3247 25.9818 16.2793C25.9818 14.3039 27.5198 13.1573 29.6281 13.1573C33.2786 13.1573 40.7969 13.1573 42.2041 13.1573C44.0489 13.1573 45.9315 13.4233 44.971 16.3601L39.8842 31.8734C39.8845 31.8738 35.7287 33 29.3447 33Z"),i.setAttribute("d","M43.3039 35.3278C40.7894 37.1212 37.0648 38.1124 30.7449 38.1124C19.852 38.1124 11.8797 34.1251 8.62927 26.3952C7.0925 22.7415 7.24041 18.6005 7.24041 13H0.00129513C0.00129513 18.9056 -0.0984386 23.5361 1.45249 27.8011C5.51933 38.989 15.992 45 30.0606 45C43.6783 45 49.3213 41.0443 53 35.3278H43.3039Z"),this._svgElement.appendChild(e),this._svgElement.appendChild(i)}addStyle(){const t=document.createElement("style");t.innerHTML=`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }

          5% {
            transform: rotate(-10deg);
            animation-timing-function: ease-out;
          }

          17% {
            transform: rotate(370deg);
            animation-timing-function: ease-in-out;
          }

          20% {
            transform: rotate(360deg);
            animation-timing-function: ease-in-out;
          }

          100% {
            transform: rotate(360deg);
          }
        }

        #watermark-background {
          position: absolute;
          pointer-events: none;
          width: 100%;
          transition-property: opacity;
          transition-duration: ${this._fadeDuration}s;
        }

        #watermark-link {
          all: unset;
          position: absolute;
          cursor: pointer;
          pointer-events: none;
          user-select: none;

          /* For Safari */
          -webkit-user-select: none;
        }

        #watermark {
          display: flex;
          flex-direction: row;
          align-items: center;
          transition-property: opacity;
          transition-duration: ${this._fadeDuration}s;
          transition-timing-function: ease-out;
        }

        #watermark > div {
          display: flex;
          flex-direction: column;
          margin-left: 5px;
        }

        #watermark span {
          color: white;
          font-family: 'Tahoma', 'Gill sans', 'Helvetica', 'Arial';
          font-size: ${this._textFontSize}px;
          transition: opacity;
          transition-duration: ${this._fadeDuration}s;

          /* For Safari */
          -webkit-transition: opacity;
          -webkit-transition-duration: ${this._fadeDuration}s;
        }

        #watermark svg.spinning {
          animation-name: spin;
          animation-direction: normal;
          animation-duration: 5s;
          animation-iteration-count: 3;
          animation-delay: 1.5s;
        }

        #watermark svg path {
          fill: white;
        }

        @media (hover: hover) {
          #watermark span {
            text-decoration: underline;
            text-decoration-style: solid;
            text-decoration-color: transparent;
          }

          #watermark:hover span {
            text-decoration-color: white;

            /* For Safari */
            -webkit-text-decoration-color: white;
          }
        }
        `,document.head.appendChild(t)}}s.RuntimeWatermark=r})(a=n.watermark||(n.watermark={}))})(gdjs||(gdjs={}));
//# sourceMappingURL=runtimewatermark.js.map
