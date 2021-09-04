import { useEffect, useState } from "react"

const AppInput = ({ value, onChange, rules, ...props }) => {
    const [errors, setErrors] = useState([])

    useEffect(() => {
        validateInput()
    }, [value])

    function validateInput (){
        if(rules && Array.isArray(rules)){
          const result = []
          rules.forEach(rule => {
              const hasError = rule(value)
              if(hasError){
                  result.push(hasError)
              }
          })
          setErrors(result)
        }
    }

    return (
        <div>
            {errors.length &&
                errors.map(error =>
                    <small>{error}</small>)
            }
            <input
                className='input__style'
                value={value}
                onChange={e => setValue(e.target.value)}
                rules = {[
                    (value) => value ===''? 'Не может быть пустым':false
                ]}
            />
        </div>

    )
}
export default AppInput