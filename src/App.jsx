import { useState, useCallback,useEffect,useRef } from 'react'
import './App.css'

const App = () => {

    const [length, setLength] = useState(8)
    const [numberAllow, setNumberAllow] = useState()
    const [charAllow, setCharAllow] = useState()
    const [password, setPassword] = useState("")
    

    //Use of useRef
    const passwordRef = useRef()

    //Use of useCAllback for optimaztion
    const passwordGenrator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if (numberAllow) {
            str = str + "0123456789"
        }
        if (charAllow) {
            str = str + "~!@#$%^&*(){}[]?"
        }

        for (let i = 1; i <=length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
        }

        setPassword(pass)
    }, [length, numberAllow, charAllow, setPassword])

    const copyClipboard  =useCallback(()=>{
        passwordRef.current?.select()
        //For choosing Selected area
        // passwordRef.current?.setSelectionRange(0,5)
        window.navigator.clipboard.writeText(password)
    },[password])
  

    //Using useeffect if any changes in website or content 
    useEffect(()=>{
        passwordGenrator()
    },[length, numberAllow, charAllow,passwordGenrator])
    
    return (
        <>
        <div className="main ">
            <h2>Password Generator</h2>
            <div className="button">
                <input type="text"
                id='text'
                readOnly
                ref={passwordRef}
                value={password}/>

                <button
                onClick={copyClipboard}
                id='copy'
                >Copy</button>
            </div>
            <div className="content">
                <input
                    type="range"
                    id="range"
                    min={6}
                    max={15}
                    value={length}
                    onChange={(e) => {
                        setLength(e.target.value)
                    }}
                />
                <label htmlFor="range">Length:{length}</label>
                <input
                    type="checkbox"
                    id="check"
                    value={numberAllow}
                    onChange={()=>{
                        setNumberAllow((prev) =>!prev)
                    }}/>
                    <label htmlFor="check">Numbers</label>
                <input type="checkbox" id="char"
                    value={charAllow}
                    onChange={()=>{
                        setCharAllow((prev) =>!prev)
                    }}/>
                    <label htmlFor="char">Characters</label>
            </div>
        </div>
    </>
)
}
export default App