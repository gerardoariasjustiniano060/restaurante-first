export default function Badge({
    color = 'blue', className = '', ...props
}) {
    return (<span className={`px-2 py-1 text-xs rounded-full bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-200 }`}>
        {props.children}
    </span>)
}