

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class InsertResultServlet
 * 
 * Description: This servlet handles the insertion of 
 *  quiz/test results into the database.
 */
@WebServlet("/InsertResultServlet")
public class InsertResultServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InsertResultServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		System.out.println("doGet/doPost in InsertResultServlet called");
		
		// getting request parameters
		String numRight = request.getParameter("numRight");
		String numTotal = request.getParameter("numTotal");
		String arithmeticType = request.getParameter("arithmeticType");
		String email = request.getParameter("email");
		
		// Testing parameters
		System.out.println(numRight);
		System.out.println(numTotal);
		System.out.println(arithmeticType);
		System.out.println(email);
		
		// Insert values into database
		
		// Return status message.
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
