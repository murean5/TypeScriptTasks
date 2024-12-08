import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, styled, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../styles/ArticleAccordion.module.scss';

// интерфейс для пропсов компонента ArticleAccordion
interface ArticleAccordionProps {
    title: string;
    content: string;
    isOdd: boolean;
}

// стилизованный компонент Accordion с использованием styled API
const StyledAccordion = styled(Accordion)<{ isOdd: boolean; isDarkMode: boolean }>(
    ({ isOdd, isDarkMode }) => ({
        // установка фона и цвета текста в зависимости от isOdd и isDarkMode
        backgroundColor: isOdd
            ? (isDarkMode ? '#424242' : '#212121')
            : (isDarkMode ? '#607d8b' : '#90caf9'),
        color: isOdd ? 'white' : 'black',
    }),
);

// стилизованный компонент AccordionSummary с использованием styled API
const StyledAccordionSummary = styled(AccordionSummary)<{ isOdd: boolean }>(({ isOdd }) => ({
    // установка цвета иконки в зависимости от isOdd
    '.MuiSvgIcon-root': {
        color: isOdd ? 'white' : 'black',
    },
}));

// компонент ArticleAccordion
export const ArticleAccordion: React.FC<ArticleAccordionProps> = ({ title, content, isOdd }) => {
    // получение текущей темы
    const theme = useTheme();

    return (
        // использование стилизованного компонента StyledAccordion
        <StyledAccordion
            isOdd={isOdd}
            isDarkMode={theme.palette.mode === 'dark'}
            className={styles.accordion}
        >
            {/* использование стилизованного компонента StyledAccordionSummary */}
            <StyledAccordionSummary isOdd={isOdd} expandIcon={<ExpandMoreIcon />}>
                {title}
            </StyledAccordionSummary>
            <AccordionDetails>
                {/* отображение контента статьи */}
                <p className={styles.content}>{content}</p>
            </AccordionDetails>
        </StyledAccordion>
    );
};