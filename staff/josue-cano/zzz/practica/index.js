
var n = 10;

var b = true;

var s = "hello world";

var o = { name:'Omar', age: '20',hello: h};

var p = { name:'Oswald', age: '20'};

var m = p;

var a = [];
a['name']= 'Anna';
    
a[0]= 100;
a[1]= 200;
a[2]= 300;
a[7]= 'seven';
a[10]= 'ten';
a[15] = o;
a[21] = 'twenty one';

var f = function(){
    return 'hola mundo '
}

f.surname='callable';

var g = f;


var h = function(name){
    return 'hello '+ name;
}

var v = function (index){
        return a[index]
    }

 o.hello=h       ;



 var a = 11;
 var b = 1221;
 var m = ['josue', 'lucas', 'pedro', 'ana', 'luisa', 'jorge', 'luis', 'luz', 'daniela', 'juan', 'roberto'];
 var s = m[0]; 
 var o = function(a, s) {
    for(var i= 0; i < m.length; i++){
        var result = ''; // Acumulador para almacenar los resultados del bucle
        for(var i = 0; i < m.length; i++){
            result += 'hello ' + m[i] + ' age ' + a + '\n'; // Agrega los resultados al acumulador
        }
        return result; // Retorna el resultado acumulado
    }
 };
 
 console.log(o(a, s)); 
 var k = function(index, array){ return array[index]} 
 k(n,0)