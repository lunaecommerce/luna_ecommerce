import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

const ShippingPolicyPage = () => {
  return (
    <div className='h-min-screen px-8 py-4'>
      <div className='pb-8 space-y-4'>
        <h2 className='text-2xl font-bold pb-2'>Política de entrega e envio</h2>
        <p>Última atualização: 11/05/2024</p>
        <p>
          A Gacessórios está comprometida em fornecer uma experiência de entrega
          eficiente e confiável para nossos clientes. Esta política descreve
          nossos procedimentos de entrega e as condições aplicáveis.
        </p>
        <p>
          Se surgirem dúvidas ou se precisar de assistência relacionada à
          entrega, por favor, entre em contato conosco através do nosso e-mail:
          sac@gacessorios.com.br ou pelo nosso WhatsApp: (87) 9910-9356.
        </p>
      </div>
      <Accordion type='multiple'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>1. Opções de Entrega</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>Entrega Padrão: Envio com prazo de entrega estimado</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>2. Áreas de Entrega:</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Realizamos entregas em Garanhuns e São João. Para áreas de
                difícil acesso ou locais específicos, o prazo de entrega pode
                ser estendido.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>3. Prazo de Entrega</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                O prazo de entrega pode variar dependendo do destino, método de
                entrega selecionado e disponibilidade do produto. Faremos o
                possível para cumprir os prazos de entrega informados, porém não
                nos responsabilizamos por atrasos decorrentes de eventos fora de
                nosso controle.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4'>
          <AccordionTrigger>4. Acompanhamento de Entrega</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Oferecemos a opção de verificar o status da entrega tanto
                através do nosso site quanto pelo nosso WhatsApp.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-5'>
          <AccordionTrigger>5. Taxas de Entrega</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                As taxas de entrega são calculadas com base no método de entrega
                selecionado, peso e dimensões do pacote, e local de entrega. As
                taxas serão exibidas durante o processo de checkout antes da
                confirmação do pedido.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-6'>
          <AccordionTrigger>6. Responsabilidade do Cliente</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                É responsabilidade do cliente fornecer informações de entrega
                precisas e completas no momento da compra. Se houver erros ou
                informações incompletas, isso pode resultar em atrasos na
                entrega ou devolução do pedido.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-7'>
          <AccordionTrigger>7. Recusa de Entrega</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Se você recusar a entrega de um pedido sem justificativa válida,
                poderemos cobrar taxas adicionais de envio ou retenção do valor
                do pedido.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-8'>
          <AccordionTrigger>8. Danos Durante o Transporte</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Caso seu pedido chegue danificado, entre em contato conosco
                imediatamente para que possamos resolver o problema. Fotografias
                dos danos podem ser solicitadas para processar uma reclamação
                junto à transportadora.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ShippingPolicyPage;
