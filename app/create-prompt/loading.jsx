import { Wave } from 'react-css-spinners';


const loading = () => {
    return (
        <div

            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
            <Wave
                color="rgba(238,139,68,1)"
                size={100}
                thickness={15}
            />
        </div>
    )
}

export default loading