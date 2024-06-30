import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

const PagePolicies = () => {
  return (
    <div className='h-min-screen px-8 py-4'>
      <div className='pb-8 space-y-4'>
        <h2 className='text-2xl font-bold pb-2'>Termos de uso</h2>
        <p>Última atualização: 11/05/2024</p>
        <p>
          Este documento estabelece os termos e condições de uso do site{' '}
          <Link href='gacessorios.com.br'>gacessorios.com.br</Link> e quaisquer
          serviços relacionados oferecidos pela Gacessórios.
        </p>
        <p>
          Ao acessar ou utilizar nosso site,{' '}
          <Link href='gacessorios.com.br'>gacessorios.com.br</Link>, você
          concorda em cumprir estes termos de uso e todas as leis e regulamentos
          aplicáveis. Se você não concordar com algum destes termos, por favor,
          abstenha-se de usar nosso site.
        </p>
      </div>
      <Accordion type='multiple'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>1. Uso do Site</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Você concorda em utilizar nosso Site apenas para fins legais e
                de acordo com estes Termos de Uso. Você concorda em não utilizar
                o Site de maneira que possa danificar, desativar, sobrecarregar
                ou prejudicar o funcionamento do Site.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>2. Conta do Usuário</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Alguns recursos do nosso Site podem exigir que você crie uma
                conta de usuário. Você é responsável por manter a
                confidencialidade de suas informações de conta e por todas as
                atividades que ocorrem em sua conta.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>3. Propriedade Intelectual</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Todo o conteúdo do Site, incluindo texto, gráficos, logotipos,
                imagens, vídeos, áudio e software, é de propriedade da Empresa
                ou de seus licenciadores e está protegido por leis de direitos
                autorais e outras leis de propriedade intelectual.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4'>
          <AccordionTrigger>4. Comunicações Eletrônicas</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Ao utilizar nosso Site, você concorda em receber comunicações
                eletrônicas da Empresa, incluindo e-mails relacionados à sua
                conta e notificações sobre o Site.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-5'>
          <AccordionTrigger>5. Limitação de Responsabilidade</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                O uso do Site é por sua própria conta e risco. Em nenhuma
                circunstância a Empresa será responsável por quaisquer danos
                diretos, indiretos, incidentais, consequenciais ou especiais
                decorrentes do uso ou incapacidade de uso do Site.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-6'>
          <AccordionTrigger>6. Alterações nos Termos de Uso</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                A Empresa reserva-se o direito de atualizar ou modificar estes
                Termos de Uso a qualquer momento, sem aviso prévio. A versão
                mais recente dos Termos de Uso será publicada em nosso Site, e
                sua continuação no uso do Site após tais alterações constitui
                sua aceitação dos novos termos.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-7'>
          <AccordionTrigger>7. Disposições Finais</AccordionTrigger>
          <AccordionContent className='px-8'>
            <ul className='list-disc space-y-4'>
              <li>
                Estes Termos de Uso são regidos e interpretados de acordo com as
                leis do Brasil. Você concorda com a jurisdição exclusiva dos
                tribunais localizados no Brasil para resolver qualquer disputa
                decorrente ou relacionada a estes Termos de Uso.
              </li>
              <li>
                Se você tiver dúvidas ou preocupações sobre estes Termos de Uso,
                entre em contato conosco através dos seguintes meios:
                sac@gacessorios.com.br
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PagePolicies;
