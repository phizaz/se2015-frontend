# อัพเดทสำหรับการเขียน Directive
อันนี้จะเป็นตัวอย่างการเขียน directive แบบ isolated scope แบบทีน่าจะง่ายขึ้นมาอีก 

```
import Directive from '../directive';

import template from './doctor-calendar-body.template.html';

let partial = 
	angular.module('moduleName', [
		require('../path/to/moduleDependency'),
	]);

// บรรทัดนี้ทำให้คนอื่นสามารถ require อย่างด้านบนได้ !! สำคัญ !!
// หมายเหตุ: partial.name เป็น string เฉย ๆ	
export default partial.name;

partial.directive('directiveName', 
	(Something) => {
		return Directive.new({
			controllerAs: 'my',
			link: link,
			template: template,
			
			// เอาไว้ให้คนนอกติดต่อเข้ามา ใช้แทน scope
			// เรียกใช้ผ่าน `this` ได้
			interfaces: {
				public: '=name',
				outsideVal: '=',
			},
			
			// ตัวแปรที่จะใช้ผ่าน `this`
			props: {
				x: 0,
				y: 0,
			},
			
			// ถ้ามี: คำสั่งที่เกี่ยวกับการ watch
			watcher() {
				this.$scope.$watch(...);
			}
			
			// ถ้ามี: คำสั่งที่จะเรียกในตอนแรก
			starter() {
				...
			}
			
			// methods ต่าง ๆ ที่เรียกใช้ได้ผ่าน `this`
			methods: {
				
				outside() {
					return this.outsideVal;
				}
				
				sum() {
					return this.x + this.y;
				}
				
			}
			
		});
		
		function link($scope, element, attrs) {
			let my = Directive.getPrivate($scope);
			// ทำไรก็ทำ 
			...
		}
		
	});
```

# อัพเดทสำหรับระบบ Module !
แต่เดิมนั้นเรายึด มาตรฐานการเขียนแบบ modular จาก gocardless แต่ผมคิดว่ามันนถึงเวลาที่ต้องเปลี่ยน เพราะว่า การเขียนแบบเดิมนั้น "เยอะโดยใช่เหตุ" ซึ่งผมเสนอวิธีการเขียนแบบใหม่สั้นลง ! ดังนี้

## directive

### แบบเดิม

ซึ่งจะต้องเขียน "คำเดิม ๆ" ไว้หลายที่

```
import {moduleDependency} from '../path/to/modlueDependency';

export let moduleName = 
	angular
		.module('moduleName', [
			moduleDependency.name
		])
		.directive('directiveName', directiveFunction);
		
function directiveFunction() {
	...
}
```

### แบบใหม่
ซึ่งจะเขียนชื่อ module เพียงที่เดียวคือตรง dependecies ของ angular.module ผมคิดว่างดงามกว่ามาก ๆ 

```
let partial = 
	angular.module('moduleName', [
		require('../path/to/moduleDependency'),
	]);

// บรรทัดนี้ทำให้คนอื่นสามารถ require อย่างด้านบนได้ !! สำคัญ !!
// หมายเหตุ: partial.name เป็น string เฉย ๆ	
export default partial.name;

partial.directive('directiveName', directiveFunction);

function directiveFunction() {
	...
}
```

## service
อันนี้นอกจากจะมีการแก้ไขแบบด้านบนแล้ว ยังมีการพัฒนาอีกเล็กน้อยเพื่อลดการพิมพ์ `this.private.varName`

### เดิม

```
import {moduleDependency} from '../path/to/modlueDependency';

class ServiceName {
	constructor($http) {
		
		this.private = {};
		_.extend(this.private, {
			$http: $http
		});
		
		_.extend(this, {
			...
		});
	
	}
	
	callSomething() {
		return this.private.$http.get('....')....
	}
}

export let moduleName = 
	angular
		.module('moduleName', [
			moduleDependency.name
		])
		.service('ServiceName', ServiceName);
		
```

### ใหม่

```
import _ from 'lodash';

let partial = 
	angular.module('moduleName', [
		require('../path/to/moduleDependency'),
	]);

// บรรทัดนี้ทำให้คนอื่นสามารถ require อย่างด้านบนได้ !! สำคัญ !!
// หมายเหตุ: partial.name เป็น string เฉย ๆ	
export default partial.name;

partial.service('ServiceName',
	($http, $q) => {
	
		class ServiceName {
			constructor() {
				
				_.extend(this, {
					...
				});
			
			}
			
			callSomething() {
				// เรียกใช้ $http ได้เลย
				return $http.get('....')....
			}
		}
		
		return new ServiceName();
	});
```

# Phizaz's Angular Seed
Angular skeleton with Webpack and Karma (Jasmine) configured

# คำปรารภ
เป้าหมายของการสร้าง repo นี้ก็คือเพื่อให้การพัฒนาเว็บไซต์ด้วย AngularJS เป็นไปได้อย่างง่ายดายและเหมาะสม โดยข้าพเจ้ากล่าวคำว่า "เหมาะสม"​ ก็ด้วย repo นี้มาพร้อมกับเครื่องมืออย่างครบครับ

# สิ่งที่มาด้วย

1. [Webpack](https://webpack.github.io/) + Gulp ซึ่งแบ่งเป็น 2 environment คือการ development กับ production โดยส่วนของ Gulp นั้นคือ build tools ที่ใช้ในการเรียก Webpack มาใช้งาน
2. Webpack สำหรับ development ได้ติดตั้ง webpack-dev-server พร้อมกับ hot-code reload (ทำให้ update หน้าได้เร็วกว่าการ refresh) มาให้เรียบร้อยแล้ว เพื่อการพัฒนาที่ไม่ติดขัด สามารถใช้งานได้ผ่าน `gulp develop` และเข้าไปใช้งานผ่าน webbrowser ผ่าน url ที่ได้รับได้ทันที
3. Webpack สำหรับ production ซึ่งได้ config เครื่องมือต่าง ๆ สำหรับ optimize มาไว้พร้อมแล้วนั่นก็คือ uglify และ minify สามารถเรียกใช้งานได้ผ่าน `gulp product`
3. [Bower](http://bower.io/) ได้ติดตั้งให้สามารถใช้งานกับ Webpack ได้อย่างไม่น่ามีปัญหา สามารถ require bower package ได้เลย เช่น `bower install --save jquery` แล้ว `require('jquery')` อย่างไรก็ดีได้ลง jquery มาให้ด้วยแต่ตั้นอยู่แล้ว
4. Bootstrap สามารถใช้งานได้เลย (require ไว้่ที่ `bootstrap.js`)
5. AngularJS โดยส่วนของ AngularJS นั้นใช้รูปแบบการเขียนของ [gocardless](https://github.com/gocardless/angularjs-style-guide) โดยได้ใช้ ui-router เป็น router หลักในที่นี้
6. Babel (es6) ทำให้สามารถเขียน AngularJS ด้วยมาตรฐาน ES6 ได้เลย
7. Karma + Jasmine สำหรับการเขียน unit-test ที่ได้ติดตั้งให้พร้อมใช้งานกับ Webpack แล้ว
8. Lodash ปกติเวลาใช้ก็เรียก `let _ = require('lodash');` เป็น library สารพัดประโยชน์สำหรับช่วยให้การเขียน javascript มีความสุขขึ้น
9. jQuery ไม่ต้องการคำแนะนำสำหรับ library นี้ ช่วยให้เราจัดการกับ DOM ได้ง่ายยิ่งขึ้น ซึ่งสามารถเรียกใช้ได้เลย ! เพราะว่า import ให้แล้ว
10. ตัวอย่างการเขียน route, controller, service, และ messaging (pub-sub) ได้ลองเขียนให้ดูเป็นตัวอย่างแล้ว

# สิ่งที่ต้องมี
คุณต้องมีะ Python version 2 (หากใช้ 3 ก็ต้อง switch มาใช้ 2 ในตอนลง ซึ่งถ้าใช้ pyenv อยู่ทำอย่างนี้ก็จะไม่ยากเย็นเท่าไหร่) แต่ว่าโดยทั่วไปแล้ว Python ที่ติดมากับเครื่องมักเป็น version 2

คุณต้องลง nodejs version 4.2+ ไว้เสียก่อน (แนะนำให้ลงผ่าน nvm) และจะต้องใช้งาน `npm` (version 3.3+) ได้ (ซึ่งในบางกรณี อาจจะต้องเรียกพร้อมกับ `sudo` อย่างไรก็ดีการลงผ่าน nvm จะไม่ต้องเรียก `sudo` ผู้เขียนจึงคิดว่าเป็นวิธีการที่ดีกว่า)

repo นี้ต้องใช้ bower และ gulp ซึ่งต้องได้ลงเอาไว้เสียก่อน ดังนี้


```
npm install -g bower
```

การใส่ `-g` คือการลงแบบ global คือการลงแบบทุก ๆ ที่ในเครื่องนี้จะเห็นโปรแกรม bower ทั้งหมด จึงสามารถเรียกใช้โปรแกรมนี้ได้จากทุกที่

หมายเหตุ: bower ใช้เพื่อลง package สำหรับ front-end โดยเฉพาะ เช่น jquery, font-awesome แต่ว่าในบางครั้ง package เดียวกันก็มีทั้ง npm และ bower หากเลือกได้โปรดเลือกที่จะลงผ่าน npm

```
npm install -g gulp
```

สำหรับการลง gulp ซึ่งเป็น build-tools หรือโปรแกรมที่จัดการเกี่ยวกับ source code สำหรับ repo นี้เราใช้สำหรับการเรียกใช้งาน webpack มาทำงานเป็นหลัก

## สิ่งที่แนะนำอย่างยิ่งว่าควรมี
ในการเขียน javascript ให้ไม่เสียอารมณ์นั้นแนะนำอย่างยิ่งให้ติดตั้งโปรแกรม **jshint** ไว้ด้วย ซึ่งจะช่วย "ด่า" เราเมื่อเราเขียนไม่ดี หรอเขียนผิดหลัก syntax ซึ่งจะช่วยให้เราเขียน javascript ที่มีคุณภาพมากขึ้น และลดเวลาติด "บัก" ได้หลายชั่วโคตรทีเดียว

ซึ่ง repo นี้ได้แนบไฟล์ `.jshintrc` มาไว้ให้แล้วเหลือแต่ท่านที่จะต้องติดตัั้งโปรแกรม jshint ให้พร้อมใช้กับ editor ตัวโปรแกรมของท่านเอง

หากท่านใช้ Sublime Text 3 ท่านจะต้องลงโปรแกรมตามนี้

1. ลง jshint ผ่านทาง npm `npm install -g jshint`
2. ลง SublimeLinter 
3. ลง SublimeLinter-jshint


# การติดตั้ง
แนะนำให้ **fork** จาก repo นี้ไป เพราะจะได้สามารถใช้งานได้เหมือนเป็นของตัวเอง สามารถนำไปใช้งานกับ project ตัวเองได้ และสามารถ push ได้ ! (ถ้า clone ไปจะ push กลับมาไม่ได้นะ และถ้าโหลดเป็น zip ไปก็จะ pull ไม่ได้ถ้า repo นี้มีการ update)

โดยเมื่อ fork ไปแล้ว แล้ว repo นี้มีการ update ก็สามารถ update repo ที่ fork ไปได้เหมือนกัน โดยการ[เพิ่ม remote repo ให้กับ repo ที่ fork ไป](http://stackoverflow.com/questions/3903817/pull-new-updates-from-original-github-repository-into-forked-github-repository) แล้วก็จะสามารถ pull update ของ repo นี้มาลง repo ส่วนตัวได้ตามปกติ

เมื่อ fork และ clone แล้วการติดตั้ง repo นี้ควรจะไม่ยากเกินว่า 

```
npm install && bower install
```

ซึ่งคำสั่งดังกล่าวจะไปเรียกไฟล์ package.json และ bower.json ตามลำดับ และลงโปรแกรมต่าง ๆ ตามที่ได้เขียนไว้ในนั้นเรียบร้อยแล้ว

หมายเหตุ: โปรดเชื่อมต่อกับ internet ความเร็วสูง และอาจจะต้องติดตั้งเป็นเวลานาน

# การพัฒนาโปรแกรม
ซึ่งสามารถทำได้โดยการเรียกคำสั่ง

```
gulp
# or
gulp develop
```

ซึ่งจะทำงานตลอดไป (จนกว่าจะให้หยุด) คำสั่งนี้จะสร้าง webserver เฉพาะกาลขึ้นมาเพื่องานนี้โดยเฉพาะ และเราสามารถทดสอบเว็บไซต์ผ่าน webserver นั้นได้ เมื่อมีการแก้ไขโค้ดผลลัพธ์ก็จะสะท้อนออกมาจาก webserver นั้น (แน่นอนว่าต้องใช้เวลาเล็กน้อย ราว ๆ 1-2 วินาที) โดยทั่วไปจะเป็น `http://localhost:3000` และเนื่องจากได้ติดตั้งระบบ hot-code reloading ไว้ สามารถเข้าไปงานได้จาก `http://localhost:3000/webpack-dev-server/index.html` ซึ่งจะดีกว่า เพราะว่า hot-code reloading ทำให้หน้าทั้งหน้าไม่ต้อง refresh เมื่อมีการแก้ไขโค้ด เพียงแก้ส่วนที่จำเป็นต้องแก้เท่านั้น ทำให้เราเสียเวลาน้อยลงกว่าจะเห็นผลลัพธ์ของการแก้ไข

## สำหรับเชื่อมต่อกับ Backend
แน่นอนว่า Angular ทำงานเพียงเฉพาะ frontend เท่านั้น และหากเราต้องการทำงานให้ครบสูตรเราก็ต้องพัฒนาดส่วนของ backend เองด้วย ซึ่งข้าพเจ้าได้เตรียมตัวอย่าง backend ซึ่งพัฒนาด้วย Laravel 5 ไว้แล้วใน folder `app` (ซึ่งจะอยู่อีก repo หนึ่ง ไม่ต้องรวมมาให้ด้วย)

แต่เนื่องจาก การใช้ webserver ดังกล่าวไม่ได้รวมทั้ง backend ด้วย ดังนั้นเราต้อง host backend ไว้อีก webserver หนึ่งและเชื่อมกันด้วย สิ่งที่เรียกว่า **proxy** ซึ่งอยู่ในไฟล์ ส่วน `devServer` ซึ่งจะทำหน้า "ส่งผ่าน" request ที่มี url ที่กำหนด ไปยัง url (อื่น) ที่กำหนดในที่นี้ก็คือ webserver ตัวอื่น

```
proxy: {
  // with backend
  '/api*': {
    // target: webpackBaseConfig.baseUrl + '/server',
    target: 'http://homestead.app',
    secure: false,
  },
},
```

จากการ config แบบนี้ไว้สำหรับ เชื่อมต่อกับ Laravel 5 ที่ผมได้เกริ่นไว้ข้างต้น โดย Laravel 5 ตัวนี้ได้ติดตั้งผ่าน Vagrant (และได้รับการติดตั้งไว้อย่างถูกต้องตาม document ของ Laravel) จะสามารถเชื่อมต่อผ่าน http://homestead.app ได้

# เตรียมพร้อมสำหรับออกใช้จริง
ซึ่งสามารถทำได้ด้วยการเรียกคำสั่ง 

```
gulp product
```

ซึ่งจะทำงานค่อนข้างนาน แต่นั่นไม่ใช่ปัญหาที่ต้องกังวล เพราะว่าคำสั่งนี้ไม่ควรถูกเรียกใช้อยู่ประจำ เพียงเรียกก่อนที่จะแจกจ่ายโปรแกรมให้คนทั่วไปใช้งานเท่านั้น ซึ่งผลลัพธ์ของการเรียกจะอยู่ใน `public`
นั่นแปลว่าสมมติว่าเราต้องการเอาเว็บไซต์ขึ้นไปใช้จริง เราเพียงก้อบข้อมูลส่วน `index.html` และ folder `public` ขึ้นไปก็เพียงพอแล้ว (สำหรับ front-end อย่างเดียวนะ)

# การทดสอบโปรแกรม
repo นี้มาพร้อมกับ Karma และ Jasmine ติดตั้งไว้แล้วเพื่อให้การทดสอบ อย่างน้อย unit-test เป็นไปได้ โดยการเขียนโปรดเขียน ไฟล์​ .spec.js ไว้ควบคู่กับไฟล์ที่ต้องการทดสอบ เช่น เรามี service ชื่อว่า user.service.js เราควรจะตั้งชื่อไฟล์สำหรับ unit-test ว่า user.service.spec.js ไว้ที่เดียวกันกับไฟล์นั้น

สำหรับการเริ่มรันตัวทดสอบก็คือ

```
npm test
```

โดยตัวทดสอบจะรันค้างไว้ตลอดและจะอัพเดทผลการทดสอบเมื่อมีการแก้ไขไฟล์

# รายงานข้อผิดพลาด และ feature ที่ต้องการให้เพิ่ม
สามารถตั้งกระทู้และอธิบายสิ่งที่เกิดขึ้น (หากเป็น error กรุณาเอา error  message มาด้วย และโปรดระบุวิธีสร้าง error นั้นอีกครั้ง)​ เขียนได้ที่ [issue tracker](https://github.com/phizaz/angular-seed/issues) ที่ github.com นี่เอง (อยู่ที่แถบทางด้านขวา)

# หากต้องการทำให้ REPO นี้ดีขึ้น
สามารถ contribute ด้วยการ fork ไปแล้วสร้าง branch ของตัวเอง ตั้งชื่อเป็นสิ่งที่ต้องการจะเพิ่มเติม (ชื่อ feature) เมื่อแก้ไขทุกอย่างเรียบร้อยแล้ว (ทดสอบด้วยนะ -..-) ก็ขอ pull request มา

# อ่านเพิ่มเติม
1. [Gocardless' Angular Style](https://github.com/gocardless/angularjs-style-guide)
2. [Exploring Angular 1.3: Binding to Directive Controllers](http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html)
