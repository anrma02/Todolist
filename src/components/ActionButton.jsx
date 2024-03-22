import { MdEdit } from 'react-icons/md';
import Button from '~/components/Button';

// eslint-disable-next-line react/prop-types
export const ActionButton = ({ action, onClick, onCancel, handleEditButtonClick, item }) => {
    switch (action) {
        case 'add':
            return (
                <Button type="submit" className="btn">
                    Thêm mới
                </Button>
            )
        case 'edit':
            return (
                <>
                    <Button onClick={onClick} className="btn">
                        Lưu
                    </Button>
                    <Button onClick={onCancel} className="btn">
                        Hủy
                    </Button>
                </>
            );
        case 'editItem':
            return (
                // eslint-disable-next-line react/prop-types
                <Button onClick={() => handleEditButtonClick(item.id, item.text)} className="btn">
                    <MdEdit />
                </Button>
            );
        default:
            return null;
    }
};