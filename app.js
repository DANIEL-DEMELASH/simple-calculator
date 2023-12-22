let textArea = document.getElementById('text-area');

let calculatorArea = document.getElementById('container');

function removeLastElement() {
    let lastIndex = parseInt(textArea.textContent.length) - 1;
    textArea.textContent = textArea.textContent.slice(0, lastIndex);
}

function addOperator(operator) {
    if(textArea.textContent === '' && !(operator === '-') || textArea.textContent == '-') {
        return;
    }   
    else if (textArea.textContent.endsWith('+') || 
             textArea.textContent.endsWith('-') || 
             textArea.textContent.endsWith('*') ||
             textArea.textContent.endsWith('/') ) {
                removeLastElement();
    }
    textArea.textContent += operator;
}

function calculate() {
    let input = textArea.textContent;
    let temp = '';
    let elements = [];

    for (let index = 0; index < input.length; index++) {
        if( input[index] == '+' || 
            input[index] == '-' || 
            input[index] == '*' || 
            input[index] == '/'){
                elements.push(parseFloat(temp));
                temp = '';
                elements.push(input[index]);
        }else{
            temp += input[index];
        }
    }
    elements.push(parseInt(temp));

    console.log(`Given Input: ${input}`);
    console.log(`Converted to Array: ${elements}`);

    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        if(element == '*' || element == '/'){
            if(element == '*')
                result = elements[index - 1] * elements[index + 1];
            else
                result = elements[index - 1] / elements[index + 1];
    
            elements.splice(index-1, 3, result);

            index -= 2;
        }
    }

    console.log(`After Calculating Product and Division: ${elements}`);

    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        if(element == '+' || element == '-'){
            if(element == '+')
                result = elements[index - 1] + elements[index + 1];
            else
                result = elements[index - 1] - elements[index + 1];
    
            elements.splice(index-1, 3, result);

            index -= 2;
        }
    }
    
    if(elements[0].toString().includes('.')){
        elements[0] = parseFloat(elements[0]).toFixed(2);
    }

    console.log(`Final Answer: ${elements}`);

    textArea.textContent = elements[0];
}

calculatorArea.addEventListener('click', (event) => {
    
    if(event.target.classList.contains('number')){
        textArea.textContent += event.target.id;
    }
    else if(event.target.classList.contains('operator')){
        addOperator(event.target.id);
    }
    else{
        switch (event.target.id) {
            case 'x':
                removeLastElement();
                break;
            case 'c':
                textArea.textContent = '';
                break;
            case '=':
                if(textArea.textContent.endsWith('+') || 
                    textArea.textContent.endsWith('-') || 
                    textArea.textContent.endsWith('*') || 
                    textArea.textContent.endsWith('/')){
                        return;
                }
                calculate();
                break;
            default:
                break;
        }
    }
})
