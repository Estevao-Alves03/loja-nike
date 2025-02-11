import Loaging from '../../img/loading.svg'

function loading() {
    return(
        <div className='w-auto h-auto flex justify-center items-center'>
            <img className='w-24' src={Loaging} alt="loading" />
        </div>
    )
}

export default loading