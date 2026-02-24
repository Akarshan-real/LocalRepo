const Logo = ({ className = "w-8" }: { className?: string }) => {
    return (
        <div className={`${className}`}>
            <img src="src\public\assets\logo.png" alt="logo" />
        </div>
    )
}

export default Logo
