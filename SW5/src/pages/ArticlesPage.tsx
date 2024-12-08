import React from 'react';
import { Container, Stack } from '@mui/material';
import { ArticleAccordion } from '../components/ArticleAccordion';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

// массив статей для отображения
const articles = [
    { title: 'Article 1', content: 'Content for the first article.' },
    { title: 'Article 2', content: 'Content for the second article.' },
    { title: 'Article 3', content: 'Content for the third article.' },
];

// компонент страницы статей
export const ArticlesPage: React.FC = () => (
    <Container maxWidth="md">
        {/* компонент для переключения темы */}
        <ThemeSwitcher />
        <Stack spacing={2}>
            {/* отображение списка статей с использованием ArticleAccordion */}
            {articles.map((article, index) => (
                <ArticleAccordion
                    key={index}
                    title={article.title}
                    content={article.content}
                    isOdd={index % 2 === 0}
                />
            ))}
        </Stack>
    </Container>
);