import {Table} from "react-bootstrap";
import styles from './TechTable.module.scss'

type TechDetail = {
    detail: string;
    specification: string;
}

type TechTableProps = {
    details: TechDetail[];
    caption: string
}

export const TechTable: React.FC<TechTableProps> = ({ details, caption }) => {
    return (
        <Table size="sm" className={styles.table}>
            <caption>{caption}</caption>
            <thead>
            <tr>
                <th>Technical Detail</th>
                <th>Specification</th>
            </tr>
            </thead>
            <tbody>
            {details.map((item, index) => (
                <tr key={index}>
                    <td>{item.detail}</td>
                    <td>{item.specification}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}