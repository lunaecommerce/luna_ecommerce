import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const PagePolicies = () => {
  return (
    <div className='h-min-screen h-screen px-8 py-4'>
      <div className='pb-8'>
        <h2 className='text-2xl font-bold pb-2'>
          Política de troca e devoluções
        </h2>
        <p>
          Solicitações podem ser feitas pelo Atendimento no WhatsApp no
          <span className='font-bold'> (87) 9910-9356</span> ou pelo nosso canal
          de atendimento no
          <span className='font-bold'> sac@gacessorios.com.br.</span>
        </p>
      </div>

      <Accordion type='multiple'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            1. Prazo para Solicitação de Troca ou Devolução
          </AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                De acordo com o artigo 49 da Lei de Defesa do Consumidor, você
                poderá solicitar a troca ou devolução no prazo máximo de 7 dias
                corridos a partir da data de recebimento do produto.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>
            2. Prazo para Solicitação de Troca ou Devolução
          </AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                O produto deve estar em perfeitas condições, sem sinais de uso
                ou violação da embalagem original.
              </li>
              <li>
                Todos os acessórios e manuais que acompanham o produto devem ser
                devolvidos.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>
            3. Procedimento para Solicitar Troca ou Devolução
          </AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Entre em contato com nosso serviço de atendimento ao cliente
                através do e-mail sac@gacessorios.com.br ou pelo whatsapp (87)
                9910-9356 para iniciar o processo de troca ou devolução.
              </li>
              <li>
                Informe o motivo da troca ou devolução e forneça o número do
                pedido.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4'>
          <AccordionTrigger>4. Opções Disponíveis</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Troca por outro produto disponível em nosso estoque, de valor
                equivalente ou mediante pagamento da diferença, se aplicável.
              </li>
              <li>
                Devolução do valor pago, através do mesmo meio de pagamento
                utilizado na compra.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-5'>
          <AccordionTrigger>
            5. Procedimento para Devolução do Produto:
          </AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Após a confirmação da solicitação de devolução, forneceremos as
                instruções para o envio do produto de volta para nossa sede.
              </li>
              <li>
                O custo do frete de devolução será de responsabilidade do
                cliente, exceto nos casos em que o produto apresentar defeito de
                fabricação.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-6'>
          <AccordionTrigger>
            6. Análise e Aprovação da Troca ou Devolução
          </AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Após o recebimento do produto devolvido, nossa equipe realizará
                uma análise para verificar se as condições acima foram
                atendidas.
              </li>
              <li>
                Se a devolução for aprovada, procederemos com a troca ou
                reembolso dentro de 2 dias úteis.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-7'>
          <AccordionTrigger>
            7. Devolução por Defeito ou Não Conformidade
          </AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Caso o produto apresente defeito de fabricação ou não esteja de
                acordo com o anunciado, você tem direito a solicitar a devolução
                ou troca, sem custo adicional.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-8'>
          <AccordionTrigger>8. Disposições Finais</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Reservamo-nos o direito de recusar a troca ou devolução de
                produtos que não atendam às condições estabelecidas nesta
                política.
              </li>
              <li>
                Esta política de trocas e devoluções está em conformidade com o
                Código de Defesa do Consumidor do Brasil.
              </li>
              <li>
                Para mais informações ou esclarecimentos sobre nossa política de
                trocas e devoluções, entre em contato com nosso serviço de
                atendimento ao cliente.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PagePolicies;
