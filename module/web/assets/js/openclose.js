function classList(e){
    if(e.classList) return e.classList;
    else return new CSSClassList(e);
}

function CSSClassList(e){ this.e = e; }

CSSClassList.prototype.contains = function(c){
    if(c.length === 0 || c.indexOf(" ") != -1) 
        throw new Error("Invalid class name: '" + c + "'");
    var classes = this.e.className;
    if(!classes) return false;
    if(classes === c) return true;

    return classes.search("\\b" + c + "\\b") != -1;
};

CSSClassList.prototype.add = function(c){
    if(this.contains(c)) return;
    var classes = this.e.className;
    if(classes && classes[classes.length-1] != " ")
        c = " " + c;
    this.e.className += c;
};

CSSClassList.prototype.remove = function(c){
    if(c.length === 0||c.indexOf(" ") != -1) 
        throw new Error("Invalid class name: '" + c + "'");
    var pattern = new RegExp("\\b" + c + "\\b\\s*", "g");
    this.e.className = this.e.className.replace(pattern, "");
};

CSSClassList.prototype.toggle = function(c){
    if(this.contains(c)){
        this.remove(c);
        return false;
    }else{
        this.add(c); 
        return true;
    }
};

CSSClassList.prototype.toString = function(){ return this.e.className; };

CSSClassList.prototype.toArray = function(){
    return this.e.className.match(/\b\w+\b/g)||[];
};
function do_onoff(hdr, item){
	var e = document.getElementById(hdr);
	var e2 = document.getElementById(item);
	if(e2.style.display == 'none'){
		e2.style.display = '';
		classList(e).remove('close');
		classList(e).add('open');
	}else{
		e2.style.display = 'none';
		classList(e).remove('open');
		classList(e).add('close');
	}
};
function open_close(hdr, item){
	var e = document.getElementById(hdr);
	var e2 = document.getElementById(item);
	e.addEventListener("click", function(){ do_onoff(hdr, item); }, false);

	classList(e).remove('open');
	classList(e).add('close');
	if(classList(e).contains('open')){
		e2.style.display = '';
	}
	if(classList(e).contains('close')){
		e2.style.display = 'none';
	}

};
function OCisSmartPhone(){
	return (
		(navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || 
		navigator.userAgent.indexOf('iPod') > 0 || 
		navigator.userAgent.indexOf('Android') > 0);
};
function OCdisplayWidth(){
	return window.parent.screen.width;
};
function OCwindowWidth(){
	if(window.screen.width < window.innerWidth){
		return window.screen.width;
	}
	return window.innerWidth;
};
