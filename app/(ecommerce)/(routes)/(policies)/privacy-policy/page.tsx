import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const PrivacyPolicyPage = () => {
  return (
    <div className='h-min-screen h-screen px-8 py-4'>
      <div className='pb-8 space-y-4'>
        <h2 className='text-2xl font-bold pb-2'>Política de privacidade</h2>
        <p>Última atualização: 11/05/2024</p>
        <p>
          A Gacessórios valoriza a privacidade de nossos clientes e está
          comprometida em proteger suas informações pessoais. Esta política
          descreve como coletamos, usamos, compartilhamos e protegemos suas
          informações ao utilizar nosso site gacessorios.com.br e quaisquer
          serviços relacionados.
        </p>
        <p>
          Se você tiver dúvidas, preocupações ou solicitações relacionadas à
          nossa política de privacidade, entre em contato conosco através dos
          seguintes meios: sac@gacessorios.com.br.
        </p>
      </div>

      <Accordion type='multiple'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>1. Informações Coletadas</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Informações Pessoais: Podemos coletar informações pessoais
                fornecidas voluntariamente por você, como nome, endereço,
                e-mail, número de telefone, informações de pagamento e outras
                informações necessárias para processar pedidos e fornecer
                suporte ao cliente.
              </li>
              <li>
                Informações de Navegação: Podemos coletar informações sobre sua
                interação com nosso site, incluindo endereço IP, tipo de
                navegador, páginas visitadas, tempo gasto em nosso site e outras
                informações de análise.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>2. Uso das Informações</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Utilizamos as informações coletadas para processar pedidos,
                fornecer suporte ao cliente, personalizar sua experiência de
                compra, melhorar nosso site e serviços, enviar comunicações de
                marketing (com seu consentimento) e cumprir obrigações legais.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>
            3. Compartilhamento de Informações
          </AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Não compartilhamos suas informações pessoais com terceiros,
                exceto quando necessário para fornecer serviços, processar
                pedidos, cumprir obrigações legais ou com seu consentimento.
              </li>
              <li>
                Podemos compartilhar informações não pessoais de forma agregada
                para fins de análise e marketing.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4'>
          <AccordionTrigger>
            4. Cookies e Tecnologias Semelhantes
          </AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Utilizamos cookies e tecnologias similares para melhorar a
                funcionalidade do site, personalizar sua experiência, analisar o
                tráfego do site e fornecer publicidade direcionada.
              </li>
              <li>
                Você pode gerenciar suas preferências de cookies através das
                configurações do seu navegador.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-5'>
          <AccordionTrigger>5. Segurança das Informações</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Implementamos medidas de segurança para proteger suas
                informações contra acesso não autorizado, uso indevido ou
                divulgação.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-6'>
          <AccordionTrigger>6. Seus Direitos</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Você tem o direito de acessar, corrigir, atualizar ou excluir
                suas informações pessoais. Você também pode optar por não
                receber comunicações de marketing.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-7'>
          <AccordionTrigger>7. Menores de Idade</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Nosso site não se destina a menores de idade e não coletamos
                intencionalmente informações de menores. Se você é menor de
                idade, não utilize nosso site ou forneça qualquer informação
                pessoal.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-8'>
          <AccordionTrigger>8. Alterações nesta Política</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Reservamo-nos o direito de atualizar esta política de
                privacidade periodicamente. Quaisquer alterações serão
                publicadas em nosso site, e a data de atualização será
                atualizada.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PrivacyPolicyPage;
