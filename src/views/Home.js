import React, { useState, useEffect } from 'react';

const initState = {
    firstNum: null,
    secondNum: null,
};

export default () => {
    const [ele, setEle] = useState({ ...initState });
    const { firstNum, secondNum } = ele;
    const [total, setTotal] = useState(null);
    const [operand, setOperand] = useState(null);
    const [history, setHistory] = useState([]);

    const handleChange = ({ target }) => {
        const { value, name } = target;

        setEle({ ...ele, [name]: value });
    };

    const handleOperand = (op) => {
        setOperand(op);
    };

    const handleCalc = () => {
        setTotal(operand === '+' ? parseInt(firstNum) + parseInt(secondNum) : parseInt(firstNum) - parseInt(secondNum));
    };

    const handleClear = () => {
        setEle({
            firstNum: null,
            secondNum: null,
        });
        setTotal(null);
        setOperand(null);
    };

    useEffect(() => {
        if (total !== null) {
            setHistory([...history, `${firstNum} ${operand} ${secondNum} = ${total}`]);
        } else {
            setEle({
                firstNum: null,
                secondNum: null,
            });
            // setTotal(null);
            setOperand(null);
        }
    }, [total]);


    function createButtons() {
        for (var i = 1; i <= 5; i++) {
            var body = document.getElementsByTagName("BODY")[0];
            var button = document.createElement("BUTTON");
            button.innerHTML = 'Button ' + i;
            button.name = i;
            button.onclick = function (e) {
                alert('This is button ' + e.target.name);
            }
            body.appendChild(button);
        }
    }
    // createButtons();

    return (
        <div>
            <h4> <b>Home</b> </h4>

            <button onClick={handleClear}>clear</button>

            <br />
            <input type="number" name={'firstNum'} value={firstNum} onChange={handleChange} ></input>
            <input type="number" name={'secondNum'} value={secondNum} onChange={handleChange} ></input>

            <button onClick={() => handleOperand('+')}>+</button>
            <button onClick={() => handleOperand('-')}>-</button>

            <button onClick={handleCalc}>=</button>

            <div>Total: {total}</div>
            {createButtons()}
            <br />

            {'history'}
            {
                history.map((h) => <div> {h}</div>)
            }
        </div>
    );
};


// const [text, setText] = useState('');
// const [list, setList] = useState([]);
// const [curIndex, setCurIndex] = useState(-1);

// const handleChangeText = (e) => {
//     setText(e.target.value);  

//     const curList = [...list];
//     curList[curIndex + 1] = e.target.value;
//     setList(curList);
// };

// const handleAddToList = () => {
//     // setList([...list, text]);
//     setText('');
//     setCurIndex(list.length - 1)
// };

// const handleDelete = (todo) => {
//     setList(list.filter(t => t !== todo));
// };


{/* <input type="text" value={text} onChange={handleChangeText} ></input>
            <button onClick={handleAddToList}>Add</button>
            {
                list.map((todo, i) => <div style={{ border: '1px solid gray', width: '10rem' }}>{todo}
                    <button onClick={() => handleDelete(todo)}>Delete</button>
                </div>)
            } */}