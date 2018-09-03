<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as Rest;
use AppBundle\Entity\Ticket;
use AppBundle\Form\Type\TicketType;


class TicketController extends Controller
{
    /**
     * @Rest\View()
     * @Rest\Get("/tickets")
     */
    public function getTicketsAction(Request $request)
    {
        $tickets = $this->get('doctrine.orm.entity_manager')
                ->getRepository('AppBundle:Ticket')
                ->findAll();
        /* @var $tickets Ticket[] */

        return $tickets;
    }

    /**
     * @Rest\View()
     * @Rest\Get("/tickets/{ticket_id}")
     */
    public function getTicketAction(Request $request)
    {
        $ticket = $this->get('doctrine.orm.entity_manager')
                ->getRepository('AppBundle:Ticket')
                ->find($request->get('ticket_id'));
        /* @var $ticket Ticket */

        if (empty($ticket)) {
            return new JsonResponse(['message' => 'Ticket not found'], Response::HTTP_NOT_FOUND);
        }

        return $ticket;
    }

    /**
     * @Rest\View(statusCode=Response::HTTP_CREATED)
     * @Rest\Post("/tickets")
     */
    public function postTicketsAction(Request $request)
    {
        $ticket = new Ticket();
        $form = $this->createForm(TicketType::class, $ticket);

        $form->submit($request->request->all());

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($ticket);
            $em->flush();
            return $ticket;
        } else {
            return $form;
        }
    }

    /**
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @Rest\Delete("/tickets/{id}")
     */
    public function removeTicketAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $ticket = $em->getRepository('AppBundle:Ticket')
                    ->find($request->get('id'));
        /* @var $ticket Ticket */
        
        if($ticket){
            $em->remove($ticket);
            $em->flush();
        }
    }

    /**
    * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
    * @Rest\Put("/tickets/{id}/upcount")
    */
    public function updateIncreaseCountAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $ticket = $em->getRepository('AppBundle:Ticket')
                    ->find($request->get('id'));
        /* @var $ticket Ticket */

        if (empty($ticket)) {
            return new JsonResponse(['message' => 'Ticket not found'], Response::HTTP_NOT_FOUND);
        }

        $ticket->setCount($ticket->getCount() + 1);
        $em->persist($ticket);
        $em->flush();

        return $ticket;
    }

    /**
    * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
    * @Rest\Put("/tickets/{id}/downcount")
    */
    public function updateDecreaseCountAction(Request $request)
    {
        $em = $this->get('doctrine.orm.entity_manager');
        $ticket = $em->getRepository('AppBundle:Ticket')
                    ->find($request->get('id'));
        /* @var $ticket Ticket */

        if (empty($ticket)) {
            return new JsonResponse(['message' => 'Ticket not found'], Response::HTTP_NOT_FOUND);
        }

        $ticket->setCount($ticket->getCount() - 1);
        $em->persist($ticket);
        $em->flush();

        return $ticket;
    }
}