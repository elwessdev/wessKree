import { Modal } from 'antd';
import { FC, memo } from 'react';

interface props {
    open: boolean,
    cancel: (val: boolean) => void
}

const Login: FC<props> = ({open,cancel}) => {
    return (
        <div id="login">
            <Modal title="Basic Modal" open={open} onCancel={()=>cancel(false)}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default memo(Login);