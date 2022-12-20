import styles from "./chat.module.css";

const Chat = ({items, owner}) => {
    const elements = items.map(({id, message, user}) => {
        const className = user === owner ? styles.youMessage : styles.userMessage
        return <div key={id} className={className}>
            <span>{user}:</span>
            <div>{message}</div>
        </div>
    })
    return (
        <div className={styles.chat}>
            {elements}
        </div>
    )
}

export default Chat;

Chat.defaultProps = {
    items: []
}
