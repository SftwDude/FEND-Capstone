import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/styles.scss'

//export to our 'Client' library which is created by the output in webpack.dev
export {
    checkForName,
    handleSubmit
}