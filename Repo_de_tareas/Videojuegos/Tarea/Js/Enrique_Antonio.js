//Enrique Antonio Pires Rodríguez

// Pregunta 1
export function firstNonRepeating(x){
    var position = x;
    if (!x){
        return undefined;
    }
    for(let step=0; step<x.length;step++)
    {  
        let cambio=true;
        for (let step2=0;step2<x.length;step2++){
            if (position[step] === position [step2] && step!==step2){
                cambio= false;
                break;
            }
        }
        if (cambio){
            return position[step];
        }
    }
    return null;
}

//Pregunta 2
export function bubbleSort(x) {
    var n = x.length;
    for (let i=0;i<n;i++){
        for (let j=0;j< n-i;j++){
            if (x[j]>x[j+1]){
                let temp = x[j];
                x[j] = x[j+1];
                x[j+1] = temp 
            }
        }

    }
    return x;
}

//Pregunta 3
export function invertArray(x){
    var ArrayIn = [];
    var j = x.length
    for (let i=0; i<x.length;i++){
        ArrayIn.push(x[j-i-1]);
    }
    return ArrayIn
}

export function invertArrayInplace(newArray){
    let left =0;
    let right = newArray.length-1;
    while (left<right){
        [newArray[left], newArray[right]] = [newArray[right], newArray[left]];
        left++;
        right--;
    }
    return newArray;
}

//Pregunta 4
export function capitalize(x){
    let Array = x.split("");
    for (let i=0;i<Array.length;i++){
        if (i===0 || Array[i-1] === " "){
            Array[i]=Array[i].toUpperCase();
        }
    }
    return Array.join("");
}

//Pregunta 5
export function mcd (x,y){;
    let menor=Math.min(x,y);
    if (x===0 && y===0){
        return 0;
    }
    for (let i=menor; i>1;i--){
        if (x%i===0 && y%i==0){
            return i;
        }
    }
}

//Pregunta 6
export function hackerSpeak (x){
    var oracion= x.split("");
    for (let i=0; i<x.length;i++){
        if (oracion[i].toLowerCase()==="a"){
            oracion[i]="4";
        }
        if (oracion[i].toLowerCase()==="e"){
            oracion[i]="3";
        }
        if (oracion[i].toLowerCase()==="i"){
            oracion[i]="1";
        }
        if (oracion[i].toLowerCase()==="o"){
            oracion[i]="0";
        }
        if (oracion[i].toLowerCase()==="s"){
            oracion[i]="5";
        }
    }
    return oracion.join("");
}
//Pregunta 7
export function factorize(x){
    var lista = [];
    for (let i=1;i<=x;i++){
        if (x%i === 0){
            lista.push(i);
        }
    }
    return lista;
}

//Pregunta 8
export function deduplicate(x){
    var lista =[];
    for (let i=0;i<x.length;i++){
        var condicion = true;
        for (let j=0;j<x.length;j++){
            if (x[i]===x[j]){
                for(let k=0;k<=lista.length;k++){
                    if (lista[k]===x[j]){
                        condicion = false;
                        break;
                    }
                }
            }
        }
        if (condicion===true){
            lista.push(x[i]);
        }
    }
    return lista;
}

//Pregunta 9
export function findShortestString(x) {
    if (x.length === 0) return 0;
    let resultado = x[0].length;
    for (let i = 1; i < x.length; i++) {
        if (x[i].length < resultado) {
            resultado = x[i].length;
        }
    }
    return resultado;
}

//Pregunta 10
export function isPalindrome(x) {
    const palabra = x.toLowerCase()
    return palabra === palabra.split('').reverse().join('');
  }


//Pregunta 11
export function sortStrings(x){
    return x.sort();
}

//Pregunta 12
export function stats(x){
    if (x.length===0){
        return [0,0]
    }
    if(x.length===1){
        return [x[0],x[0]]
    }
    let ordenado =x.sort((a,b)=>a-b);
    let resultado =0;
    let resultado2 =0;
    const valorLista = (x.length)/2 

    if (valorLista%2===0){
        resultado = (ordenado[valorLista-1] + ordenado[valorLista]) /2;
    }
    else{
        resultado = ordenado[Math.floor(valorLista)];
    }
    let conteoMax=0;
    for (let i=0;i<x.length;i++){
        let conteo=0;
        for (let j=0;j<x.length;j++){
            if(ordenado[i]===ordenado[j]){
                conteo++
            }
        }
        if (conteo>conteoMax){
            conteoMax=conteo
            resultado2=ordenado[i]
        }
    }
    return [resultado,resultado2];
}

//Pregunta 13
export function popularString(x){
    if (!x){
        return 0;
    }
    let resultado="";
    let conteoTotal=0;
    var listaSR=[...new Set(x)];
    for (let i=0;i<listaSR.length;i++){
        let conteo=0;
        for(let j=0;j<x.length;j++){
            if (listaSR[i]===x[j]){
                conteo++
            }
        }
        if(conteo>conteoTotal){
            resultado=listaSR[i];
            conteoTotal=conteo;
        }
    }
    return resultado;
}
//Pregunta 14
export function isPowerOf2(x){
    if (x<=2){
        return true;
    }
    let i=1;
    while (true){
        var raiz = x**(1/i);
        if (raiz===2){
            return true;
        }
        else if (raiz<2){
            return false;
        }
        i++
    }
}

//Pregunta 15
export function sortDescending(x){
    var Lista =x.sort((a,b)=>b-a)
    return Lista;
}