<?php
namespace App\Controller;

use App\Entity\Idea;
use App\Repository\IdeaRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;

class IdeaController extends ApiController
{
    /**
    * @Route("/ideas")
    * @Method("GET")
    */
    public function index(IdeaRepository $ideaRepository)
    {
        $ideas = $ideaRepository->transformAll();

        return $this->respond($ideas);
    }

    /**
     * @Route("/ideas/{id}")
     * @Method("GET")
     */
    public function show($id, IdeaRepository $ideaRepository)
    {
        $idea = $ideaRepository->find($id);

        if (! $idea) {
            return $this->respondNotFound();
        }

        $idea = $ideaRepository->transform($idea);

        return $this->respond($idea);
    }

    /**
    * @Route("/ideas")
    * @Method("POST")
    */
    public function create(Request $request, IdeaRepository $ideaRepository, EntityManagerInterface $em)
    {
        $request = $this->transformJsonBody($request);

        if (! $request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        // validate the content
        if (! $request->get('content')) {
            return $this->respondValidationError('Please provide a content!');
        }

        // persist the new idea
        $idea = new Idea;
        $idea->setContent($request->get('content'));
        $idea->setCount(0);
        $em->persist($idea);
        $em->flush();

        return $this->respondCreated($ideaRepository->transform($idea));
    }

    /**
    * @Route("/ideas/{id}/upcount")
    * @Method("POST")
    */
    public function increaseCount($id, EntityManagerInterface $em, IdeaRepository $ideaRepository)
    {
        $idea = $ideaRepository->find($id);

        if (! $idea) {
            return $this->respondNotFound();
        }

        $idea->setCount($idea->getCount() + 1);
        $em->persist($idea);
        $em->flush();

        return $this->respond([
            'count' => $idea->getCount()
        ]);
    }
    /**
    * @Route("/ideas/{id}/downcount")
    * @Method("POST")
    */
    public function decreaseCount($id, EntityManagerInterface $em, IdeaRepository $ideaRepository)
    {
        $idea = $ideaRepository->find($id);

        if (! $idea) {
            return $this->respondNotFound();
        }

        $idea->setCount($idea->getCount() - 1);
        $em->persist($idea);
        $em->flush();

        return $this->respond([
            'count' => $idea->getCount()
        ]);
    }
}