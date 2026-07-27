// src/components/Horarios.jsx

import React from 'react';

function traduzirDia(dia) {
    const mapaDias = { seg: "Segunda-feira", ter: "Terça-feira", qua: "Quarta-feira", qui: "Quinta-feira", sex: "Sexta-feira", sab: "Sábado", dom: "Domingo" };
    if (/^\d{4}-\d{2}-\d{2}$/.test(dia)) {
        return new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', timeZone: 'America/Sao_Paulo' }).format(new Date(`${dia}T12:00:00-03:00`));
    }
    return mapaDias[dia.toLowerCase()] || dia;
}

// O componente agora recebe também a prop `isLoading`
const Horarios = ({ horarios, isLoading }) => {
    // 1. Se estiver a carregar, mostra a mensagem
    if (isLoading) {
        return <p className="sem-horarios-texto">A carregar horários...</p>;
    }

    // 2. Se terminou de carregar e não há horários, mostra a mensagem de indisponibilidade
    if (!horarios || Object.keys(horarios).length === 0) {
        return <p className="sem-horarios-texto">Nenhum horário disponível no momento.</p>;
    }

    const diasComHorarios = Object.entries(horarios).filter(([, lista]) => lista.length > 0);

    if (diasComHorarios.length === 0) {
        return <p className="sem-horarios-texto">Nenhum horário disponível no momento.</p>;
    }
    
    // 3. Se terminou de carregar e há horários, exibe a lista
    return (
        <div className="horarios-container">
            <h4>Horários Disponíveis:</h4>
            <ul className="horarios-lista">
                {diasComHorarios.map(([dia, lista]) => (
                    <li key={dia}>
                        <span className="dia">{traduzirDia(dia)}:</span> {lista.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Horarios;
